import { useSession } from 'next-auth/react';
import { uptime } from 'process';
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

const GamefildAdmin = (props: any) => {
  const { data: session, status: sessionStatus }: any = useSession();
  const [loading, setLoading] = useState(true);
  const [game, setGame] = useState();
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('0');
  const [ships, setShips] = useState([]);
  const [selectedPrize, setSelectedPrize] = useState([]);
  const [prizes, setPrizes] = useState([]);
  const [isSelected, setIsSelected] = useState();
  const [gameField, setGameField] = useState([]);

  useEffect(() => {
    fetchUsers();
    fetchShips();
    setGameFildPost();
    fetch("/api/prizes?name=" + session.user?.name, {
      method: "GET",
    })
      .then(response => response.json())
      .then((data) => {
        setPrizes(data.items);
      })
      .catch((error) => {
        console.error("Error fetching prizes:", error);
      });
    fetch("/api/game/info?id=" + props.id, {
      method: "GET",
    })
      .then(response => response.json())
      .then((data) => {
        setGame(data.item);
        setAmount(data.users[0].amount);
        //перебор короблей в game field
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching prizes:", error);
        setLoading(false);
      })
  }, [])

  //#region 
  const renderCells = (i: any) => {
    const cells = [];
    for (let j = 1; j <= game.size; j++) {
      const id = i * game.size + j
      cells.push(
        <td key={j} className={id + " w-[50px] h-[50px] border-solid border-2 border-sky-500 text-center"} onClick={() => addShipField(id)}>
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

  async function fetchShips() {
    fetch("/api/game/ship?id=" + props.id, {
      method: "GET",
    })
      .then(response => response.json())
      .then((data) => {
        setShips(data.ships);
        const prizeIds = data.ships.reduce((accumulator, ship) => {
          if (ship.prizeId === null) {
            accumulator.push("");
          } else {
            accumulator.push(ship.prizeId);
          }
          return accumulator;
        }, []);
        setSelectedPrize(prizeIds);
      })
      .catch((error) => {
        console.error("Error fetching prizes:", error);
      })
  };

  async function fetchUsers() {
    fetch("/api/game/user?id=" + props.id, {
      method: "GET",
    })
      .then(response => response.json())
      .then((data) => {
        setUsers(data.users);
      })
      .catch((error) => {
        console.error("Error fetching prizes:", error);
      })
  };

  async function addUser() {
    const formData = new FormData();
    formData.append('id', props.id);
    formData.append('name', name)
    formData.append('amount', amount)

    fetch("/api/game/user", {
      method: "POST",
      body: formData
    })
      .then(() => {
        fetchUsers();
        setName('');
      })
      .catch((error) => {
        console.error("Error fetching prizes:", error);
      })
  };

  async function deleteUser(userName: any) {
    const formData = new FormData();
    formData.append('id', props.id);
    formData.append('name', userName)

    fetch("/api/game/user/", {
      method: "DELETE",
      body: formData
    })
      .then(() => {
        fetchUsers();
      })
      .catch((error) => {
        console.error("Error fetching game:", error);
      });
  };

  async function updateAmount() {
    const formData = new FormData();
    formData.append('id', props.id);
    formData.append('amount', amount)

    fetch("/api/game/user/amount", {
      method: "POST",
      body: formData
    })
      .catch((error) => {
        console.error("Error fetching game:", error);
      });
  }

  async function addShip() {
    const formData = new FormData();
    formData.append('id', props.id);

    fetch("/api/game/ship", {
      method: "POST",
      body: formData
    })
      .then(() => {
        fetchShips();
      })
      .catch((error) => {
        console.error("Error fetching prizes:", error);
      })
  }

  async function handlePrizeChange(e: any, shipId: any) {
    const selectedPrize = e.target.value;
    setSelectedPrize(selectedPrize);
    const formData = new FormData();
    formData.append('id', props.id);
    formData.append('shipId', shipId);
    formData.append('prizeId', selectedPrize);

    fetch("/api/game/ship/prize", {
      method: "POST",
      body: formData
    })
      .then(() => {
        fetchShips();
      })
      .catch((error) => {
        console.error("Error fetching prizes:", error);
      })
  }

  async function deleteShip(shipId: any) {
    const formData = new FormData();
    formData.append('id', props.id);
    formData.append('shipId', shipId)

    fetch("/api/game/ship/", {
      method: "DELETE",
      body: formData
    })
      .then(() => {
        fetchShips();
      })
      .catch((error) => {
        console.error("Error fetching game:", error);
      });
  }

  const handleClick = (id: any) => {
    setIsSelected(id);
  }
  //#endregion

  async function addShipField(id: any) {
    if (isSelected) {
      setIsSelected(null);
      if (!gameField.includes(isSelected)) {
        const formData = new FormData();
        formData.append('id', props.id);
        formData.append('place', id);
        formData.append('shipId', isSelected - 1);

        fetch("/api/game/ship/add", {
          method: "POST",
          body: formData
        })
          .catch((error) => {
            console.error("Error fetching prizes:", error);
          })

        const newGameField = [...gameField]
        newGameField[id] = isSelected;
        setGameField(newGameField);
      }
    }
    if (gameField[id] != undefined) {
      const formData = new FormData();
      formData.append('id', props.id);
      formData.append('shipId', gameField[id] - 1);

      fetch("/api/game/ship/delete", {
        method: "POST",
        body: formData
      })
        .catch((error) => {
          console.error("Error fetching prizes:", error);
        })

      const newGameField = [...gameField]
      newGameField[id] = undefined;
      setGameField(newGameField);
    }
  }

  async function setGameFildPost() {
    const formData = new FormData();
    formData.append('id', props.id);;

    fetch("/api/game/ship/info", {
      method: "POST",
      body: formData
    })
      .then(response => response.json())
      .then((data) => {
        setGameField(data.array);
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
        <div>
          <button onClick={addShip}>Добавить корабль</button>

          <ul>
            {ships ? ships.map((ship) => (
              <li key={ship.id} onClick={() => handleClick(ship.id + 1)} className={`p-4 border-solid border-2 border-sky-500 ${isSelected == ship.id + 1 ? 'bg-blue-500' : 'bg-black'}`}>
                {ship.id + 1}
                <select
                  className='text-black ml-4'
                  value={selectedPrize[ship.id]}
                  onChange={(e) => handlePrizeChange(e, ship.id)}
                >
                  <option disabled value="">Выберите приз</option>
                  {prizes.map((prize) => (
                    <option className='text-black' key={prize.id} value={prize.id}>{prize.title}</option>
                  ))}
                </select>
                <button className='ml-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600' onClick={() => deleteShip(ship.id)}>Delete</button>
              </li>
            )) : "Корабли не созданы"}
          </ul>
        </div>
        <div className='mt-10'>
          <input
            className='text-black'
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button onClick={updateAmount}>Обновить выстрелы</button>
          <input
            className='text-black'
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={addUser}>Добавить игрока</button>

          <ul>
            {users ? users.map((user) => (
              <li key={user.name} className='p-4 border-solid border-2 border-sky-500'>
                {user.name}
                <button className="ml-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600" onClick={() => deleteUser(user.name)}>Delete</button>
              </li>
            )) : "Игроков нету"}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default GamefildAdmin
