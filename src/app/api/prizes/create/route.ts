import Prize from "@/models/Prize";
import connect from "@/utils/db";
import path from "path";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
const fs = require('fs');

export const POST = async (request: any) => {
    const data = await request.formData();
    const fileData = data.get('img')

    await connect();

    if (!fileData) {
        return NextResponse.json({ error: "No files received." }, { status: 400 });
    }
    const buffer = Buffer.from(await fileData.arrayBuffer());
    const fileName = Date.now() + fileData.name.replaceAll(" ", "_");
    const newPrize = new Prize({
        creator: data.get('creator'),
        title: data.get('title'),
        description: data.get('description'),
    });

    function findHighestSuffixes(directory: string): number {
        let highestNumber: number | null = 0;
        try {
            const files = fs.readdirSync(directory);
            for (const file of files) {
                const filePath = directory + '/' + file;
                if (fs.statSync(filePath).isFile()) {
                    const fileName = file.slice(0, -4);
                    const number = parseInt(fileName);
                    if (!isNaN(number)) {
                        if (highestNumber === null || number > highestNumber) {
                            highestNumber = number;
                        }
                    }
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
        return highestNumber;
    }

    try {
        await writeFile(
            path.join(process.cwd(), "public/_img/prize/" + (findHighestSuffixes("public/_img/prize/") + 1) + fileName.substr(-4, fileName.length)),
            buffer
        );
        await newPrize.save();
        return new NextResponse("Приз создан", { status: 200 });
    } catch (err: any) {
        console.log(err)
        return new NextResponse(err, {
            status: 500,
        });
    }
};