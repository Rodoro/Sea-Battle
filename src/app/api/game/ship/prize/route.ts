import connect from "@/utils/db";
import Game from "@/models/Gamefild"

export const POST = async (req: any) => {
    const data = await req.formData();

    try {
        await connect();

        const game = await Game.findOneAndUpdate({ id: data.get('id') }, {
            $set: {
                [`ships.${data.get('shipId')}.prizeId`]: data.get('prizeId'),
            },
        })

        return new Response("Пользователь добавлен", { status: 200 })
    } catch (error) {

        console.error(error)
        return new Response("Ошибка сервера", { status: 500 })
    }
}