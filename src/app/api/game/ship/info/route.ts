import connect from "@/utils/db";
import Game from "@/models/Gamefild"
import Prize from "@/models/Prize";

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
                        game.ships.forEach(async (ship) => {
                            if (ship.place == shot) {
                                let prize = await Prize.findOne({ id: ship.prizeId})
                                prize.playedout = true
                                prize.playedout_name = user.name
                                await prize.save()
                            }
                        })
                    } else {
                        array[shot] = 999
                    }
                })
            })
        })

        return Response.json({ array })
    } catch (error) {

        console.error(error)
        return new Response("Ошибка сервера", { status: 500 })
    }
}