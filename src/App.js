import { useState } from 'react';

var turn = 'X';

function Square() {
  const [value, setValue] = useState(null);
  function handleClick() {
    if (!value) {
      setValue(turn);
    }
    turn = turn === 'X' ? 'O' : 'X';
  }
  return (<button className="square" onClick={handleClick}>{value}</button>);
}

export default function Board() {
  return <>
    <div className="board-row">
      < Square />
      < Square />
      < Square />
    </div>
    <div className="board-row">
      < Square />
      < Square />
      < Square />
    </div>
    <div className="board-row">
      < Square />
      < Square />
      < Square />
    </div>
  </>
}