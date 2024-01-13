import { useNavigate } from "react-router-dom";
import { useScoreboard } from "../../../hooks/useScoreboard";
import { Player } from "../../../api/playersApi";
import { useEffect, useState } from "react";

export function MobileSetup() {
    const { playersGame, insertPlayer, deletePlayer, swapPlayer, setIsRunning, isRunning } = useScoreboard();
    const [hasInput, setHasInput] = useState(false);
    const [newPlayerName, setNewPlayerName] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const keyHandler = (e: KeyboardEvent) => {
            if (e.key === "+") {
                e.preventDefault();
                setHasInput(!hasInput);
                setNewPlayerName(""); 
            }
        };
        document.addEventListener("keypress", keyHandler);

        return () => {
          document.removeEventListener("keypress", keyHandler);
        };
    }, [hasInput]);

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

    function handleAddNewPlayerButton(e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        if (hasInput == true) {
            if (newPlayerName.length > 0) {
                insertPlayer({
                    name: newPlayerName,
                    gamePoints: 0,
                    turns: 0,
                    gameBiggestTurn: 0
                })
                setNewPlayerName("");
                setHasInput(false);
            } else {
                setHasInput(false);
            }
        } else {
            setHasInput(true);
        }
    }
    
    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th className="updown"></th>
                        <th className="name">Name</th>
                        <th className="updown"></th>
                    </tr>
                </thead>
                <tbody>

                    {playersGame.map((p, index) => {
                        return (
                            <tr key={index} className={index % 2 === 0 ? "darker" : "none"}>
                                <td className="updown">{!isRunning && <button onClick={(e) => deselect(e, p)}>{"X"}</button>}</td>
                                <td className="name">{p.name}</td>
                                <td className="updown">{!isRunning && index > 0 && <button onClick={(e) => up(e, index)}>{"↑"}</button>}</td>
                            </tr>
                        )})}

                        <tr className={playersGame.length % 2 === 0 && hasInput ? "darker" : ""} >
                            <td colSpan={2}>
                                {hasInput &&
                                    <form onSubmit={handleAddNewPlayerButton}>
                                        <input name="name" id="name" type="text" autoComplete="name" autoFocus placeholder="Name" value={newPlayerName} onChange={e => setNewPlayerName(e.currentTarget.value)}></input>
                                        <label htmlFor="name">hinzufügen</label>
                                    </form>
                                }
                            </td>
                            <td className="updown"><button className="new" onClick={e => handleAddNewPlayerButton(e)} >+</button></td>
                        </tr>

                </tbody>
            </table>

            <div className="start">
                {playersGame.length > 1 && !isRunning && <button className="start" onClick={startGame}>Spiel starten</button>}
            </div>

        </div>
    )
}