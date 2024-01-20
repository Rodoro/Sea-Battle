import Game from "@/models/Gamefild";
import connect from "@/utils/db";

export const GET = async (req: any) => {
    const { searchParams } = new URL(req.url)
    const name = searchParams.get('name')

    try {
        await connect();
        let items = []

        if (searchParams.get('role') == 'user') {
            await Game.find().then((res) => {
                res.forEach((game) => {
                    game.users.forEach((user: any) => {
                        items.push(game)
                    })
                })
            })
        } else {
            items = await Game.find({ creator: name })
        }

        return Response.json({ items })
    } catch (error) {
        console.error(error)
        return new Response("Ошибка сервера", { status: 500 })
    }
}