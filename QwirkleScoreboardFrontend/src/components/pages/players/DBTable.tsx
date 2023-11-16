import { useEffect, useState } from "react";
import { Player, postNewPlayer } from "../../../api/playersApi";
import { useScoreboard } from "../../../hooks/useScoreboard"
import "./DBTable.css"

export function DBTable() {
    const { playersDB, playersGame, insertPlayer, insertPlayerDatabase, isRunning } = useScoreboard();
    const [hasInput, setHasInput] = useState(false);
    const [newPlayerName, setNewPlayerName] = useState("");

    const newPlayer: Player = {
        id: 0,
        name: newPlayerName,
        gamePoints: 0,
        totalPoints: 0,
        turns: 0,
        gameBiggestTurn: 0,
        totalBiggestTurn: 0
    }

    useEffect(() => {
        const keyHandler = (e: KeyboardEvent) => {
            if ((e.key === "a" || e.key === "A" || e.key === "+")) {
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

    const select = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, player: Player) => {
        e.preventDefault();
        if (playersGame.filter(p => p.id === player.id).length === 0) {
            insertPlayer(player);
        }
    }

    function handleAddNewPlayerButton(e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        if (hasInput == true) {
            if (newPlayerName.length > 0) {
                postNewPlayer(newPlayer).then((data) => {
                    insertPlayerDatabase(data);
                    setNewPlayerName("");
                    setHasInput(false);
                }).catch(error => {
                    alert(error.response.data.message)
                });
            } else {
                setHasInput(false);
            }
        } else {
            setHasInput(true);
        }
    }

    return (
        <div className="table-container">
            <div>
                <h3 className="left">Alle Spiele</h3>
            </div>
            <table>
                <thead>
                    <tr>
                        <th className="name">Name</th>
                        <th className="points">Punkte</th>
                        <th className="top-zug">Top Zug</th>
                        <th className="updown"></th>
                    </tr>
                </thead>
                <tbody className="db">
                    {playersDB.map((p, index) => {
                        return (
                            <tr className={index % 2 === 0 ? "darker" : "none"} key={p.id}>
                                <td className="name">{p.name}</td>
                                <td className="points">{p.totalPoints}</td>
                                <td className="top-zug">{p.totalBiggestTurn}</td>
                                <td className="updown">{!isRunning && <button onClick={(e) => select(e, p)}>{"→"}</button>}</td>
                            </tr>
                        )})}
                        <tr className={playersDB.length % 2 === 0 && hasInput ? "darker" : ""} >
                            <td colSpan={3}>
                                {hasInput &&
                                    <form onSubmit={handleAddNewPlayerButton}>
                                        <input name="name" id="name" type="text" autoFocus placeholder="Name" value={newPlayer.name} onChange={e => setNewPlayerName(e.currentTarget.value)}></input>
                                        <label>hinzufügen</label>
                                    </form>
                                }
                            </td>
                            <td className="updown"><button className="new" onClick={e => handleAddNewPlayerButton(e)} >+</button></td>
                        </tr>
                </tbody>
            </table>
            <div className="buffer"></div>
        </div>
    )
}