import connect from "@/utils/db";
import Game from "@/models/Gamefild"

export const GET = async (req: any) => {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    try {
        await connect();
        const item = await Game.findOne({ id: id })
        const ships = item.ships

        return Response.json({ ships })
    } catch (error) {
        console.error(error)
        return new Response("Ошибка сервера", { status: 500 })
    }
}

export const POST = async (req: any) => {
    const data = await req.formData();

    try {
        await connect();

        const game = await Game.findOne({ id: data.get('id') })
        const ship = { id: game.ships.length, place: null, prizeId: null }
        game.ships.push(ship)
        await game.save()

        return new Response("Пользователь добавлен", { status: 200 })
    } catch (error) {

        console.error(error)
        return new Response("Ошибка сервера", { status: 500 })
    }
}

export const DELETE = async (req: any) => {
    const data = await req.formData();

    try {
        await connect();

        await Game.findOneAndUpdate({ id: data.get('id') }, {$pull: {"ships":{"id": data.get('shipId')}}})
        return new Response("Файл удален", { status: 200 })
    } catch (error) {
        console.error(error)
        return new Response("Ошибка сервера", { status: 500 })
    }
}