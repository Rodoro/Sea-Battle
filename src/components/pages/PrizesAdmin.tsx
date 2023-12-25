import React, { useState } from "react";
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
    const { data: session }: any = useSession();

    const [img, setImg] = useState('');

    

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
            }
        } catch (error) {
            setError("Ошибка, повторите попытку");
            console.log(error);
        }
    }

    return (
        <div>
            <div>
                <Button onClick={() => setModal(true)}>Добавить приз</Button>
                <Modal visible={modal} setVisible={setModal}>
                    <h1 className="text-4xl text-center font-semibold mb-8">Создание нового приза </h1>
                    <form onSubmit={handleSubmit}>
                        <InputForm text="Название" type="text" placeholder="Название" />
                        <TextareaForm text="Описание" placeholder="Описание" />
                        <div className="mb-8">
                            <h1>Загрузите изображение</h1>
                            <input onChange={(event) => setImg(event.target.files[0])} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" accept=".jpg,.png" type="file" />
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">PNG, JPG(MAX. 800x400px).</p>
                        </div>
                        <ButtonForm type="submit">
                            Создать
                        </ButtonForm>
                    </form>
                </Modal>
                <PrizeCardAdmin prize={{id:2}}/>

            </div>
        </div>
    )
}

export default PrizesAdmin
