"use client";
import RoleCheker from '@/components/RoleChecker'
import PrizesAdmin from '@/components/pages/PrizesAdmin';
import PrizesUser from '@/components/pages/PrizesUser';
import React from 'react'

const Prizes = () => {
    return (
        <RoleCheker>
            <PrizesAdmin/>
            <PrizesUser/>
        </RoleCheker>
    )
}

export default Prizes
