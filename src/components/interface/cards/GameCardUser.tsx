import React from 'react'
import ButtonForm from '../ButtonForm'
import { useRouter } from 'next/navigation';

const GameCardUser = (props: any) => {
    const router = useRouter();
    
    return (
        <div className="flex flex-row roundes-lg bg-neutral-700 mt-10 md:max-w-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
            <div className="flex flex-col justify-start p-6">
                <h5 className="mb-2 text-xl text-center font-medium text-neutral-800 dark:text-neutral-50">
                    Создатель
                </h5>
                <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                    {props.game.creator}
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
                <ButtonForm onClick={() => router.push('/game-fields/' + props.game.id)}>Зайти</ButtonForm>
            </div>
        </div>
    )
}

export default GameCardUser
