import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import Button from '../interface/Button';
import Modal from '../interface/Modal';
import InputForm from '../interface/InputForm';
import TextareaForm from '../interface/TextareaForm';
import ButtonForm from '../interface/ButtonForm';
import GameCardAdmin from '../interface/cards/GameCardAdmin';

const GamefildsAdmin = () => {
    const { data: session, status: sessionStatus }: any = useSession();
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(false);
    const [error, setError] = useState("");
    const [games, setGames] = useState([]);

    useEffect(() => {
        getGames();
    }, [])

    async function getGames() {
        fetch("/api/game?name=" + session.user?.name, {
            method: "GET",
        })
            .then(response => response.json())
            .then((data) => {
                setGames(data.items);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching prizes:", error);
                setLoading(false);
            })
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const size = e.target[0].value;
        const rules = e.target[1].value;

        const formData = new FormData();
        formData.append('creator', session.user?.name);
        formData.append('size', size);
        formData.append('rules', rules);

        try {
            const res = await fetch("/api/game/create", {
                method: "POST",
                body: formData
            });
            if (res.status === 200) {
                setError("");
                setModal(false);
                getGames();
            }
        } catch (error) {
            setError("Ошибка, повторите попытку");
            console.log(error);
        }
    }

    if (sessionStatus == "loading") {
        return <p>Загрузка...</p>;
    }

    return (
        <div>
            <Button onClick={() => setModal(true)}>Создать новое поле</Button>
            <Modal visible={modal} setVisible={setModal}>
                <h1 className="text-4xl text-center font-semibold mb-8">Создание нового поля</h1>
                <form onSubmit={handleSubmit}>
                    <InputForm text="Размер поля" type="text" placeholder="N*N" />
                    <TextareaForm text="Правила" placeholder="Правила игры на любом языке" />
                    <ButtonForm type="submit">
                        Создать
                    </ButtonForm>
                </form>
            </Modal>
            <div className="flex flex-col items-center text-center">
                <h1>Список игровых полей</h1>
                {games.map((game: any) =>
                    <GameCardAdmin key={game.id} game={game} updateList={getGames} />
                )}
            </div>
        </div>
    )
}

export default GamefildsAdmin


