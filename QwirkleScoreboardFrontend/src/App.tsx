import { useEffect, useState } from 'react'
import './App.css'
import { getAllPlayers } from './api/playersApi';
import { Players } from './components/Players';

export type Player = {
    id: number;
    name: string;
    gamePoints: number;
    totalPoints: number;
    turns: number;
    gameBiggestTurn: number;
    totalBiggestTurn: number;
    isSelected: boolean;
}

function App() {
  const [players, setPlayers] = useState<Player[]>([])
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  

  return (
    <>
      <h1>Qwirkle Scoreboard</h1>
      <Players players={players} setPlayers={setPlayers}></Players>
    </>
  )
}

export default App
