"use client";
import ButtonForm from '@/components/interface/ButtonForm'
import InputForm from '@/components/interface/InputForm'
import Error from '@/components/interface/Error';
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Login = () => {
    const router = useRouter();
    const [error, setError] = useState("");
    const { data: session, status: sessionStatus } = useSession();

    useEffect(() => {
        if (sessionStatus === "authenticated") {
            router.replace("/");
        }
    }, [sessionStatus, router]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const name = e.target[0].value;
        const password = e.target[1].value;

        if (!password || password.length < 8) {
            setError("Ошибка пароля");
            return;
        }

        const res = await signIn("credentials", {
            redirect: false,
            name,
            password,
        });

        if (res?.error) {
            setError("Пароль не совпал");
            if (res?.url) router.replace("/");
        } else {
            setError("");
        }
    };

    if (sessionStatus === "loading") {
        return <h1>Загрузка...</h1>;
    }
    return (
        sessionStatus !== "authenticated" && (
            <div className="flex min-h-screen flex-col items-center justify-between p-24">
                <div className="bg-[#212121] p-8 rounded shadow-md w-96">
                    <h1 className="text-4xl text-center font-semibold mb-8">Вход</h1>
                    <form onSubmit={handleSubmit}>
                        <InputForm text="Никнейм" type="text" placeholder="Имя" />
                        <InputForm text="Пароль" type="password" placeholder="Пароль" />
                        <ButtonForm type="submit">
                            {" "}
                            Войти
                        </ButtonForm>
                        <Error text={error && error} />
                    </form>
                    <div className="text-center text-gray-500 mt-4">- ИЛИ -</div>
                    <Link
                        className="block text-center text-blue-500 hover:underline mt-2"
                        href="/register"
                    >
                        Зарегистрироватся
                    </Link>
                </div>
            </div>
        )
    )
}

export default Login
