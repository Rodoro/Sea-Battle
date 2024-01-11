import Game from "@/models/Gamefild";
import connect from "@/utils/db";

export const GET = async (req: any) => {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    try {
        await connect();
        const item = await Game.findOne({id: id})
        return Response.json({item})
    } catch (error) {
        console.error(error)
        return new Response("Ошибка сервера", {status:500})
    }
}