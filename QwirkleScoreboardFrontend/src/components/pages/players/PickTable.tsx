import { useNavigate } from "react-router-dom";
import { Player } from "../../../api/playersApi";
import { useScoreboard } from "../../../hooks/useScoreboard";
import "./pickTable.css"
import { useEffect } from "react";

export function PickTable() {
    const { playersGame, deletePlayer, swapPlayer, setIsRunning, isRunning, reset } = useScoreboard();
    const navigate = useNavigate();

    const hasDownArrows = false;

    const startGame = () => {
        setIsRunning(true);
        navigate("/game");
    }

    const deselect = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, player: Player) => {
        e.preventDefault();
        deletePlayer(player);
    }

    const up = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number) => {
        e.preventDefault();
        swapPlayer(index);
    }

    const down = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number) => {
        e.preventDefault();
        swapPlayer(index + 1);
    }

    useEffect(() => {
        const keyHandler = (e: KeyboardEvent) => {
            if ((e.key === "s" || e.key === "S")) {
                e.preventDefault();
                if (isRunning) {
                    reset();
                } else {
                    startGame();
                }
            }
        };

        if (playersGame.length > 1) {
            document.addEventListener("keypress", keyHandler);
        }

        return () => {
          document.removeEventListener("keypress", keyHandler);
        };
    }, [playersGame]);
    
    return (
        <div className="table-container">
            <div className="table-header">
                <h3 className="right">Dieses Spiel</h3>
            </div>
            <table>
                <thead>
                    <tr>
                        <th className="updown"></th>
                        <th className="name">Name</th>
                        <th className="points">Punkte</th>
                        <th className="top-zug">Top Zug</th>
                        <th className="updown"></th>
                        {hasDownArrows && <th className="updown"></th>}
                    </tr>
                </thead>
                <tbody>
                    {playersGame.map((p, index) => {
                        return (
                            <tr key={index} className={index % 2 === 0 ? "darker" : "none"}>
                                <td className="updown">{!isRunning && <button onClick={(e) => deselect(e, p)}>{"←"}</button>}</td>
                                <td className="name">{p.name}</td>
                                <td className="points">{p.gamePoints}</td>
                                <td className="top-zug">{p.gameBiggestTurn}</td>
                                <td className="updown">{!isRunning && index > 0 && <button onClick={(e) => up(e, index)}>{"↑"}</button>}</td>
                                {hasDownArrows && <td className="updown">{index < playersGame.length - 1 && <button onClick={(e) => down(e, index)}>{"↓"}</button>}</td>}
                            </tr>
                        )})}
                </tbody>
            </table>
            <div className="start">
                {playersGame.length > 1 && (isRunning 
                    ? <button className="stop" onClick={reset}>Spiel stoppen</button>
                    : <button className="start" onClick={startGame}>Spiel starten</button>)}
            </div>
        </div>
    )
}