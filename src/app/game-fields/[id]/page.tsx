"use client"
import RoleCheker from '@/components/RoleChecker'
import GamefildAdmin from '@/components/pages/GamefildAdmin'
import GamefildUser from '@/components/pages/GamefildUser'
import React from 'react'

const page = ({ params }: { params: { id: number } }) => {
    return (
        <RoleCheker>
            <GamefildAdmin id={params?.id}/>
            <GamefildUser id={params?.id} />
        </RoleCheker>
    )
}

export default page
