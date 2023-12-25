import { useSession } from 'next-auth/react';
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const AdminOnlyRoute = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();
  
  useEffect(() => {
    if (sessionStatus === "unauthenticated") {
      router.replace("/login");
    } else if(session === null || session === undefined) {
        router.replace("/login")
    } else if (session.user?.role !== "admin") {
      router.replace("/");
    } 
  }, [sessionStatus, router]);

  if(sessionStatus === "authenticated" && session.user?.role === "admin") {
    return <>{children}</>
  }

    return <>Загрузка...</>
};
  
export default AdminOnlyRoute;