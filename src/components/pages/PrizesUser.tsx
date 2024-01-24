import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import PrizeCardUser from '../interface/cards/PrizeCardUser';

const PrizesUser = () => {
  const { data: session, status: sessionStatus }: any = useSession();
  const [prizes, setPrizes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getPrizes()
  }, [])

  async function getPrizes() {
    const formData = new FormData();
    formData.append('playedout_name', session.user?.name);

    fetch("/api/prizes", {
      method: "POST",
      body: formData
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

  if (loading) {
    return <p>Загрузка...</p>;
  }

  return (
    <div>
      <div className="flex flex-col items-center text-center">
        <h1>Список призов</h1>
        {prizes.map((prize: any) =>
          <PrizeCardUser key={prize.id} prize={prize} updateList={getPrizes} />
        )}
      </div>
    </div>
  )
}

export default PrizesUser
