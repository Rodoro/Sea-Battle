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

  useEffect(() => {
    fetchUsers();
    fetchShips();
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
        setLoading(false);
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
        <td key={j} className={id + " w-[50px] h-[50px] border-solid border-2 border-sky-500 text-center"}>

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
              <li key={ship.id} className='p-4 border-solid border-2 border-sky-500'>
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
