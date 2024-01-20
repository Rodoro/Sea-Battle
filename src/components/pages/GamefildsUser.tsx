import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import GameCardUser from '../interface/cards/GameCardUser';

const GamefildsUser = () => {
  const { data: session, status: sessionStatus }: any = useSession();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [games, setGames] = useState([]);

  useEffect(() => {
    getGames();
  }, [])

  async function getGames() {
    fetch("/api/game?name=" + session.user?.name + "&role=user", {
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

  if (sessionStatus == "loading") {
    return <p>Загрузка...</p>;
  }

  return (
    <div>
      <div className="flex flex-col items-center text-center">
        <h1>Список игровых полей</h1>
        {games.map((game: any) =>
          <GameCardUser key={game.id} game={game} updateList={getGames} />
        )}
      </div>
    </div>
  )
}

export default GamefildsUser
