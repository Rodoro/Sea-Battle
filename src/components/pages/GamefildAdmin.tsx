import React, { useState } from 'react'

const GamefildAdmin = () => {

  const renderCells = (i : any) => {
    const cells = [];
    for (let j = 1; j <= 10; j++) {
      const id = i * 10 + j
      cells.push(
        <td key={j} className={id + " w-[50px] h-[50px] border-solid border-2 border-sky-500 text-center"}>
          {id}
        </td>
      );
    }
    return cells;
  };

  const renderRows = () => {
    const rows = [];
    for (let i = 0; i < 10; i++) {
      rows.push(<tr key={i}>{renderCells(i)}</tr>);
    }
    return rows;
  }

  return (
    <div>
      <div>
        {renderRows()}
      </div>
      <div>

      </div>
    </div>
  )
}

export default GamefildAdmin
