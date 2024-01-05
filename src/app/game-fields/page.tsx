"use client";
import RoleCheker from '@/components/RoleChecker'
import GamefildsAdmin from '@/components/pages/GamefildsAdmin';
import GamefildsUser from '@/components/pages/GamefildsUser';
import React from 'react'

const GameFilds = () => {
  return (
    <RoleCheker>
      <GamefildsAdmin />
      <GamefildsUser />
    </RoleCheker>
  )
}

export default GameFilds
