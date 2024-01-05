import connect from "@/utils/db";
import Game from "@/models/Gamefild"
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    const data = await req.formData();

    await connect();

    const newGame = new Game({
        creator: data.get('creator'),
        size: data.get('size'),
        rules: data.get('rules'),
    })

    try { 
        await newGame.save();
        return new NextResponse("Игра создана", { status: 200 });
    } catch (err: any) {
        console.error(err);
        return new NextResponse(err, { status: 500 });
    }
}