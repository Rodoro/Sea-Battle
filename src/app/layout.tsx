import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Session } from 'inspector'
import SessionProvider from "@/utils/SessionProvider";
import { getServerSession } from 'next-auth'
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sea Battle',
  description: 'Проект нацеленный на создание игры "Морской бой" на веб-сайте, и показать что мы знаем, умеем и можем реализовать.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession();
  return (
    <html lang="ru">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <div className="mx-auto max-w-5xl text-2xl gap-2 mb-10">
            <Navbar />
            {children}
          </div>
        </SessionProvider>
      </body>
    </html>
  )
}
