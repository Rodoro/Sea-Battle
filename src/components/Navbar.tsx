"use client"

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react'
import Button from './interface/Button';

const Navbar = () => {
    const { data: session }: any = useSession();
    return (
        <nav>
            <div>
                <ul className="flex justify-between m-10 item-center">
                    <div>
                        <Link href="/">
                            <li>Главная</li>
                        </Link>
                    </div>
                    <div className="flex gap-10">
                        <Link href="/game-fields">
                            <li>Игровые поля</li>
                        </Link>
                        <Link href="/prizes">
                            <li>Призы</li>
                        </Link>
                    </div>
                    <div className="flex gap-10">
                        {!session ? (
                            <>

                                <Link href="/login">
                                    <li>Войти</li>
                                </Link>
                                <Link href="/register">
                                    <li>Зарегистрироватся</li>
                                </Link>


                            </>
                        ) : (
                            <>
                                <div className="mr-10">
                                    {session.user?.name}
                                </div>
                                <li>
                                    <Button onClick={() => { signOut() }}>Выйти</Button>
                                </li>
                            </>
                        )}
                    </div>
                </ul >
            </div >
        </nav>

    )
}

export default Navbar
