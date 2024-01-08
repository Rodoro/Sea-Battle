"use client"
import RoleCheker from '@/components/RoleChecker'
import GamefildAdmin from '@/components/pages/GamefildAdmin'
import GamefildUser from '@/components/pages/GamefildUser'
import React from 'react'

const page = ({ params }: { params: { id: number } }) => {
    return (
        <RoleCheker>
            <GamefildAdmin />
            <GamefildUser />
        </RoleCheker>
    )
}

export default page
