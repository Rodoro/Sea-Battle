import connect from "@/utils/db";
import Game from "@/models/Gamefild"

export const POST = async (req: any) => {
    const data = await req.formData();

    try {
        await connect();
        let amount: any = data.get('amount');
        console.log(amount);

        const game = await Game.findOne({ id: data.get('id') })
        if (amount >= 1) {
            amount -= 1
            const user = game.users.find(user => user.name === data.get('name'));
            user.shot.push(data.get('shot'));
            user.amount = amount
            await game.save();
            //TODO: добавить добавление приза
        }

        console.log(amount);
        return Response.json({ amount })
    } catch (error) {

        console.error(error)
        return new Response("Ошибка сервера", { status: 500 })
    }
}