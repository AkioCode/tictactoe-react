import { useState } from 'react';

function updateWinnerSets(pos, winnerSets, currentPlayer, nextPlayer, remainingTurns){
  const replaceAt = (arr) => arr.map((n) => n === pos ? currentPlayer : n); 
  const hasBoth = (set) => [nextPlayer, pos].every((item) => set.includes(item))
  return winnerSets.reduce((acc, set) => {
    if (remainingTurns > 4 || !hasBoth(set)) {
      return[...acc, replaceAt(set)];
    } else {
      return acc;
    }
  }, []);
}

function Square({value, onSquareClick}) {
  return (<button className="square" onClick={onSquareClick}>{value}</button>);
}

export default function Board() {
  const initial_winner_sets = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ]
  const [remainingTurns, setRemainingTurns] = useState(9);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [nextPlayer, setNextPlayer] = useState('O');
  const [winnerSets, setWinnerSets] = useState(initial_winner_sets);
  const [winner, setWinner] = useState(false);
  
  function handleClick(i) {
    if (!squares[i] && remainingTurns > 0) {
      setSquares(prev => [...prev.slice(0, i), currentPlayer, ...prev.slice(i + 1)]);
      let nextWinnerSets = winnerSets.slice();
      nextWinnerSets = updateWinnerSets(i, nextWinnerSets, currentPlayer, nextPlayer, remainingTurns);
      setWinnerSets(nextWinnerSets);
      const isWinner = nextWinnerSets.some((set) => set.every((item) => item === currentPlayer)) ? currentPlayer : false;
      setWinner(isWinner);
      setRemainingTurns(isWinner ? 0 : remainingTurns - 1);
      if (!isWinner) {
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
        setNextPlayer(nextPlayer === 'X' ? 'O' : 'X');
      }
    }
  }
    

 return <>
    <div className="status">{winner ? `Winner: ${currentPlayer}` : `Next player: ${currentPlayer}`}</div>
    <div className="board-row">
      < Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
      < Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
      < Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
    </div>
    <div className="board-row">
      < Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
      < Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
      < Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
    </div>
    <div className="board-row">
      < Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
      < Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
      < Square value={squares[9]} onSquareClick={() => handleClick(9)}/>
    </div>
  </>
}