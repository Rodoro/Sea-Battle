import connect from "@/utils/db";
import Game from "@/models/Gamefild"

export const POST = async (req: any) => {
    const data = await req.formData();

    try {
        await connect();
        const array = [];

        await Game.findOne({ id: data.get('id') }).then((game) => {
            game.ships.forEach((ship) => {
                if (ship.place != null) {
                    array[ship.place] = ship.id + 1;
                }
            })
            game.users.forEach((user) => {
                user.shot.forEach((shot) => {
                    if (array[shot]) {
                        array[shot] = 0
                    } else {
                        array[shot] = 999
                    }
                })
            })
        })
        console.log(array)

        return Response.json({ array })
    } catch (error) {

        console.error(error)
        return new Response("Ошибка сервера", { status: 500 })
    }
}