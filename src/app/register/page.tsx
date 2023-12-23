"use client"
import ButtonForm from '@/components/interface/ButtonForm';
import InputForm from '@/components/interface/InputForm';
import Error from '@/components/interface/Error';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Register = () => {
    const [error, setError] = useState("");
    const router = useRouter();
    const { data: session, status: sessionStatus } = useSession();

    useEffect(() => {
        if (sessionStatus === "authenticated") {
            router.replace("/dashboard");
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

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    password,
                }),
            });
            if (res.status === 400) {
                setError("Этот пользователь уже зарегистрован");
            }
            if (res.status === 200) {
                setError("");
                router.push("/login");
            }
        } catch (error) {
            setError("Ошибка, повторите попытку");
            console.log(error);
        } 
    }

    if (sessionStatus === "loading") {
        return <h1>Загрузка...</h1>;
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="bg-[#212121] p-8 rounded shadow-md w-96">
                <h1 className="text-4xl text-center font-semibold mb-8">Регистрация</h1>
                <form onSubmit={handleSubmit}>
                    <InputForm text="Никнейм" type="text" placeholder="Имя" />
                    <InputForm text="Пароль" type="password" placeholder="Пароль" />
                    <ButtonForm type="submit">
                        {" "}
                        Зарегистрировать
                    </ButtonForm>
                    <Error text={error && error}/>
                </form>
                <div className="text-center text-gray-500 mt-4">- ИЛИ -</div>
                <Link
                    className="block text-center text-blue-500 hover:underline mt-2"
                    href="/login"
                >
                    Войдите в систему с существующей учетной записью
                </Link>
            </div>
        </div>
    )
}

export default Register
