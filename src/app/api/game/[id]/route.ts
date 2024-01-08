import connect from "@/utils/db";
import Game from "@/models/Gamefild"

export const POST = async (req: any, { params }: { params: { id: string } }) => {
    const id = params.id;
    const data = await req.formData();

    try {
        await connect();

        await Game.findOneAndUpdate({ id: id }, {
            size: data.get('size'),
            rules: data.get('rules'),
        })

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

        Game.findOneAndDelete({ id: id }).remove().exec()

        return new Response("Файл удален", { status: 200 })
    } catch (error) {
        console.error(error)
        return new Response("Ошибка сервера", { status: 500 })
    }
}