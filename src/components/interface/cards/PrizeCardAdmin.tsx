import React, { useState } from 'react'
import Image from 'next/image'
import ButtonForm from '../ButtonForm'
import Modal from '../Modal';
import InputForm from '../InputForm';
import TextareaForm from '../TextareaForm';

const PrizeCardAdmin = (props: any) => {
    const [modal, setModal] = useState(false);
    const [img, setImg] = useState('');

    const handleEdit = async (e: any) => {
        e.preventDefault();
        const title = e.target[0].value;
        const description = e.target[1].value;

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('img', img);

        console.log(img)

        try {
            const res = await fetch("/api/prizes/"+props.prize.id, {
                method: "POST",
                body: formData
            });
            if (res.status === 200) {
                setModal(false);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = (id: any) => {
        fetch("/api/prizes/" + id, {
            method: "DELETE",
        })
            .then(() => {
                props.updateList()
            })
            .catch((error) => {
                console.error("Error fetching prizes:", error);
            });
    };

    return (
        <div className="flex flex-col rounded-lg bg-white mt-10 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 md:max-w-xl md:flex-row">
            <div className="h-96 rounded-t-lg object-cover md:h-auto md:!rounded-none md:!rounded-l-lg">
                <Image
                    src={"/_img/prize/" + props.prize.id + ".jpg"}
                    width={200}
                    height={200}
                    alt="" />
            </div>
            <div className="flex flex-col justify-start p-6">
                <h5 className="mb-2 text-xl text-center font-medium text-neutral-800 dark:text-neutral-50">
                    {props.prize.title}
                </h5>
                <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                    {props.prize.description}
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-300">
                    {props.prize.createAt}
                </p>
            </div>
            <div className='flex flex-col space-y-2 self-center'>
                <ButtonForm onClick={() => handleDelete(props.prize.id)}>Удалить</ButtonForm>
                <ButtonForm onClick={() => setModal(true)}>Редактирование</ButtonForm>
            </div>
            <Modal visible={modal} setVisible={setModal}>
                <h1 className="text-4xl text-center font-semibold mb-8">Создание нового приза</h1>
                <form onSubmit={handleEdit}>
                    <InputForm text="Название" value={props.prize.title} type="text" placeholder="Название" />
                    <TextareaForm text="Описание" value={props.prize.description} placeholder="Описание" />
                    <div className="mb-8">
                        <h1>Загрузите изображение</h1>
                        <input onChange={(event) => setImg(event.target.files[0])} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" accept=".jpg,.png" type="file" />
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">PNG, JPG(MAX. 800x400px).</p>
                    </div>
                    <div className="flex flex-col space-y-4">
                        <ButtonForm type="submit">
                            Сохранить
                        </ButtonForm>
                        <ButtonForm type="button" onClick={() => setModal(false)}>
                            Отмена
                        </ButtonForm>
                        <ButtonForm type="button" onClick={() => handleDelete(props.prize.id)}>
                            Удалить
                        </ButtonForm>
                    </div>
                </form>
            </Modal>
        </div>
    )
}

export default PrizeCardAdmin
