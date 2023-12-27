import Prize from "@/models/Prize";
import connect from "@/utils/db";
const fs = require('fs');

export const POST = async (req: any, { params }: { params: { id: string }}) => {
    const id = params.id;

    try {
        await connect();

        //TODO: сохронение изменений обьекта и проверка естли есть img то изменить существующий

        return Response.json({id})
    } catch (error) {
        console.error(error)
        return new Response("Ошибка сервера", {status:500})
    }
}

export const DELETE = async (req: any, { params }: { params: { id: string }}) => {
    const id = params.id;

    try {
        await connect();

        Prize.findOneAndDelete({id: id}).remove().exec()
        fs.unlinkSync("public/_img/prize/" + id + ".jpg")

        return new Response("Файл удален", {status:200})
    } catch (error) {
        console.error(error)
        return new Response("Ошибка сервера", {status:500})
    }
}