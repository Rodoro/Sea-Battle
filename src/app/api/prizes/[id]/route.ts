import Prize from "@/models/Prize";
import connect from "@/utils/db";
const fs = require('fs');
import path from "path";
import { writeFile } from "fs/promises";

export const POST = async (req: any, { params }: { params: { id: string } }) => {
    const id = params.id;
    const data = await req.formData();
    const fileData = data.get('img');

    try {
        await connect();

        if (fileData) {
            const buffer = Buffer.from(await fileData.arrayBuffer());
            await writeFile(
                path.join(process.cwd(), "public/_img/prize/" + id + ".jpg"),
                buffer
            );
        }

        await Prize.findOneAndUpdate({ id: id }, {
            title: data.get('title'),
            description: data.get('description'),
        })

        //TODO:проверка естли есть img то изменить существующий

        return Response.json({ id })
    } catch (error) {
        console.error(error)
        return new Response("Ошибка сервера", { status: 500 })
    }
}

export const DELETE = async (req: any, { params }: { params: { id: string } }) => {
    const id = params.id;

    try {
        await connect();

        Prize.findOneAndDelete({ id: id }).remove().exec()
        fs.unlinkSync("public/_img/prize/" + id + ".jpg")

        return new Response("Файл удален", { status: 200 })
    } catch (error) {
        console.error(error)
        return new Response("Ошибка сервера", { status: 500 })
    }
}