import { useSession } from 'next-auth/react';
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const RoleCheker = ({ children }: { children: React.ReactNode }) => {
    const { data: session, status: sessionStatus } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (sessionStatus === "unauthenticated") {
            router.replace("/login");
        } else if (session === null || session === undefined) {
            router.replace("/login")
        } else if (session.user?.role !== "admin") {
            <>{children}</>
        }
    }, [sessionStatus, router]);

    if (sessionStatus === "authenticated" && session.user?.role === "admin") {
        return <>{children[0]}</>
    } else if (sessionStatus === "authenticated" && session.user?.role === "user") {
        return <>{children[1]}</>
    }

    return <>Загрузка...</>
};

export default RoleCheker;