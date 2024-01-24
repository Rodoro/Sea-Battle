import Prize from "@/models/Prize";
import connect from "@/utils/db";

export const GET = async (req: any) => {
    const { searchParams } = new URL(req.url)
    const name = searchParams.get('name')

    try {
        await connect();
        const items = await Prize.find({creator: name})

        return Response.json({items})
    } catch (error) {
        console.error(error)
        return new Response("Ошибка сервера", {status:500})
    }
}

export const POST = async (req: any) => {
    const data = await req.formData();

    try {
        await connect();

        const items = await Prize.find({ playedout_name: data.get('playedout_name') })

        console.log(items)
        return Response.json({items})
    } catch (error) {

        console.error(error)
        return new Response("Ошибка сервера", { status: 500 })
    }
}