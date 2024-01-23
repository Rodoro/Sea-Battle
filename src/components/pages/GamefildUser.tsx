import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import MarkText from '../interface/MarkText';
import Modal from '../interface/Modal';
import ButtonForm from '../interface/ButtonForm';

const GamefildUser = (props: any) => {
  const { data: session, status: sessionStatus }: any = useSession();
  const [loading, setLoading] = useState(true);
  const [game, setGame] = useState();
  const [gameField, setGameField] = useState([]);
  const [amount, setAmount] = useState();
  const [modal, setModal] = useState(false);

  useEffect(() => {
    fetchGameField()
    fetch("/api/game/info?id=" + props.id, {
      method: "GET",
    })
      .then(response => response.json())
      .then((data) => {
        setGame(data.item);
        setLoading(false);
        setAmount(data.item.users.find(user => user.name === session.user?.name).amount)
      })
      .catch((error) => {
        console.error("Error fetching prizes:", error);
        setLoading(false);
      })
  }, [])

  const renderCells = (i: any) => {
    const cells = [];
    for (let j = 1; j <= game.size; j++) {
      const id = i * game.size + j
      cells.push(
        <td key={j} className={id + " w-[50px] h-[50px] border-solid border-2 border-sky-500 text-center"} onClick={() => addShotInField(id)}>
          {gameField[id] && gameField[id] != 999 ?
            <Image
              src={"/_img/game-fild/ship.png"}
              width={50}
              height={50}
              alt="" /> : gameField[id] == 999 ?
              <Image
                src={"/_img/game-fild/away.png"}
                width={50}
                height={50}
                alt="" /> : gameField[id] == 0 ?
                <Image
                  src={"/_img/game-fild/got.png"}
                  width={50}
                  height={50}
                  alt="" /> : null}
        </td>
      );
    }
    return cells;
  };

  const renderRows = () => {
    const rows = [];
    for (let i = 0; i < game.size; i++) {
      rows.push(<tr key={i}>{renderCells(i)}</tr>);
    }
    return rows;
  }

  async function fetchGameField() {
    const formData = new FormData();
    formData.append('id', props.id);;

    fetch("/api/game/ship/info", {
      method: "POST",
      body: formData
    })
      .then(response => response.json())
      .then((data) => {
        setGameField(data.array);
        console.log(data.array)
      })
      .catch((error) => {
        console.error("Error fetching prizes:", error);
      })
  }

  async function addShotInField(id) {
    const formData = new FormData();
    formData.append('id', props.id);
    formData.append('shot', id);
    formData.append('name', session.user?.name);
    formData.append('cretorName', game.creator);
    formData.append('amount', amount);

    fetch("/api/game/user/shot", {
      method: "POST",
      body: formData
    })
      .then(response => response.json())
      .then((data) => {
        setAmount(data.amount);
        if (amount == 0) {
          setModal(true);
        }
        fetchGameField()
      })
      .catch((error) => {
        console.error("Error fetching prizes:", error);
      })
  }

  if (loading) {
    return <p>Загрузка...</p>;
  }

  return (
    <div className='grid grid-cols-3 gap-4'>
      <div className='col-span-2'>
        {renderRows()}
      </div>
      <div className='col-span-1'>
        <div className='mb-12'>
          <h1>{"Количство ходов: " + amount}</h1>
        </div>
        <h1><strong>Правила игры:</strong></h1>
        <div className='p-4 border-solid border-2 border-sky-500'>
          <MarkText>
            {game.rules}
          </MarkText>
        </div>
      </div>
      <Modal visible={modal} setVisible={setModal}>
        <h2>У вас не осталось ходов</h2>
        <ButtonForm type="button" onClick={() => setModal(false)}>
          Хорошо
        </ButtonForm>
      </Modal>
    </div>
  )
}

export default GamefildUser
