import React, { useState } from 'react'
import ButtonForm from '../ButtonForm';
import { useRouter } from 'next/navigation';
import Modal from '../Modal';
import TextareaForm from '../TextareaForm';
import InputForm from '../InputForm';

const GameCardAdmin = (props: any) => {
    const [modal, setModal] = useState(false);
    const router = useRouter();

    const handleDelete = (id: any) => {
        fetch("/api/game/" + id, {
            method: "DELETE",
        })
            .then(() => {
                props.updateList()
            })
            .catch((error) => {
                console.error("Error fetching game:", error);
            });
    };

    const handleEdit = async (e: any) => {
        e.preventDefault();
        const size = e.target[0].value;
        const rules = e.target[1].value;

        const formData = new FormData();
        formData.append('size', size);
        formData.append('rules', rules);

        try {
            const res = await fetch("/api/game/" + props.game.id, {
                method: "POST",
                body: formData
            });
            if (res.status === 200) {
                setModal(false);
                props.updateList()
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex flex-row roundes-lg bg-neutral-700 mt-10 md:max-w-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
            <div className="flex flex-col justify-start p-6">
                <h5 className="mb-2 text-xl text-center font-medium text-neutral-800 dark:text-neutral-50">
                    Размер
                </h5>
                <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                    {props.game.size}
                </p>
            </div>
            <div className="flex flex-col justify-start p-6">
                <h5 className="mb-2 text-xl text-center font-medium text-neutral-800 dark:text-neutral-50">
                    Редактировать
                </h5>
                <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                    {props.game.edit ? "Можно" : "Нельзя"}
                </p>
            </div>
            <div className="flex flex-col justify-start p-6">
                <h5 className="mb-2 text-xl text-center font-medium text-neutral-800 dark:text-neutral-50">
                    Участники
                </h5>
                <ul className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                    {props.game.users.map((user) => (
                        <li key={user.name}>{user.name}</li>
                    ))}
                </ul>
            </div>
            <div className='flex flex-col space-y-2 self-center'>
                <ButtonForm onClick={() => handleDelete(props.game.id)}>Удалить</ButtonForm>
                <ButtonForm onClick={() => setModal(true)}>Редактировать</ButtonForm>
                <ButtonForm onClick={() => router.push('/game-fields/' + props.game.id)}>Зайти</ButtonForm>
            </div>
            <Modal visible={modal} setVisible={setModal}>
                <h1 className="text-4xl text-center font-semibold mb-8">Редактирование игрового поля</h1>
                <form onSubmit={handleEdit}>
                    <InputForm text="Размеры" value={props.game.size} type="text" placeholder="Размер" />
                    <TextareaForm text="Правила" value={props.game.rules} placeholder="Правила" />
                    <div className="flex flex-col space-y-4">
                        <ButtonForm type="submit">
                            Сохранить
                        </ButtonForm>
                        <ButtonForm type="button" onClick={() => setModal(false)}>
                            Отмена
                        </ButtonForm>
                        <ButtonForm type="button" onClick={() => handleDelete(props.game.id)}>
                            Удалить
                        </ButtonForm>
                    </div>
                </form>
            </Modal>
        </div>
    )
}

export default GameCardAdmin
