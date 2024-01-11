import connect from "@/utils/db";
import Game from "@/models/Gamefild"

export const POST = async (req: any) => {
    const data = await req.formData();

    try {
        await connect();

        const game = await Game.findOne({ id: data.get('id') })
        game.users.forEach((user: any) => {
            user.amount = data.get('amount');
        });
        await game.save();

        return new Response("Выстрелы обнавлены", { status: 200 })
    } catch (error) {

        console.error(error)
        return new Response("Ошибка сервера", { status: 500 })
    }
}