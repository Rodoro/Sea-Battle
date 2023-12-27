import React, { useEffect, useState } from "react";
import Button from '../interface/Button'
import Modal from '../interface/Modal'
import InputForm from "../interface/InputForm";
import TextareaForm from "../interface/TextareaForm";
import ButtonForm from "../interface/ButtonForm";
import { useSession } from "next-auth/react";
import PrizeCardAdmin from "../interface/cards/PrizeCardAdmin";

const PrizesAdmin = () => {
    const [modal, setModal] = useState(false);
    const [error, setError] = useState("");
    const { data: session, status: sessionStatus }: any = useSession();
    const [prizes, setPrizes] = useState([]);
    const [loading, setLoading] = useState(true);

    const [img, setImg] = useState('');

    useEffect(() => {
        getPrizes()
    }, [])

    async function getPrizes() {
        fetch("/api/prizes?name=" + session.user?.name, {
            method: "GET",
        })
            .then(response => response.json())
            .then((data) => {
                setPrizes(data.items);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching prizes:", error);
                setLoading(false);
            });
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const title = e.target[0].value;
        const description = e.target[1].value;

        const formData = new FormData();
        formData.append('creator', session.user?.name);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('img', img);

        try {
            const res = await fetch("/api/prizes/create", {
                method: "POST",
                body: formData
            });
            if (res.status === 200) {
                setError("");
                setModal(false);
                getPrizes();
            }
        } catch (error) {
            setError("Ошибка, повторите попытку");
            console.log(error);
        }
    }

    if (loading) {
        return <p>Загрузка...</p>;
    }

    return (
        <div>
            <div>
                <Button onClick={() => setModal(true)}>Добавить приз</Button>
                <Modal visible={modal} setVisible={setModal}>
                    <h1 className="text-4xl text-center font-semibold mb-8">Создание нового приза</h1>
                    <form onSubmit={handleSubmit}>
                        <InputForm text="Название" type="text" placeholder="Название" />
                        <TextareaForm text="Описание" placeholder="Описание" />
                        <div className="mb-8">
                            <h1>Загрузите изображение</h1>
                            <input onChange={(event) => setImg(event.target.files[0])} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" accept=".jpg,.png" type="file" />
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">PNG, JPG(MAX. 500x500px).</p>
                        </div>
                        <ButtonForm type="submit">
                            Создать
                        </ButtonForm>
                    </form>
                </Modal>
                <div className="flex flex-col items-center text-center">
                    <h1>Список призов</h1>
                    {prizes.map((prize: any) =>
                        <PrizeCardAdmin key={prize.id} prize={prize} updateList={getPrizes}/>
                    )}
                </div>
            </div>
        </div>
    )
}

export default PrizesAdmin
