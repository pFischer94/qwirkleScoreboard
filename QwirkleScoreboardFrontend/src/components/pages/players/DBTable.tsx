import { useState } from "react";
import { Player, postNewPlayer } from "../../../api/playersApi";
import { usePlayers } from "../../../hooks/usePlayers"
import { insertPlayerDB, insertPlayerGame } from "../../../redux/slicer";
import "./DBTable.css"

export function DBTable() {
    const { playersDB, playersGame, dispatch } = usePlayers();
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

    const select = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, player: Player) => {
        e.preventDefault();
        if (playersGame.filter(p => p.id === player.id).length === 0) {
            dispatch(insertPlayerGame(player));
        }
    }

    function handleAddNewPlayerButton(e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        if (newPlayerName.length > 0) {
            postNewPlayer(newPlayer).then((data) => {
                dispatch(insertPlayerDB(data));
                setNewPlayerName("");
            }).catch(error => {
                alert(error.response.data.message)
            });
        }
    }

    return (
        <div className="table-container">
            <div>
                <h3>Alle Spiele(r)</h3>
            </div>
            <table className="db">
                <thead>
                    <tr>
                        <th className="id">ID</th>
                        <th className="name">Name</th>
                        <th className="points">Punkte</th>
                        <th className="top-zug">Top Zug</th>
                        <th className="updown"></th>
                    </tr>
                </thead>
                <tbody>
                    {playersDB.map(p => {
                        return (
                            <tr key={p.id}>
                                <td className="id">{p.id}</td>
                                <td className="name">{p.name}</td>
                                <td className="points">{p.totalPoints}</td>
                                <td className="top-zug">{p.totalBiggestTurn}</td>
                                <td className="updown"><button onClick={(e) => select(e, p)}>{"→"}</button></td>
                            </tr>
                        )})}
                        <tr className="last">
                            <td className="new">Neu</td>
                            <td colSpan={3}>
                                <form onSubmit={handleAddNewPlayerButton}>
                                        <input name="name" id="name" type="text" value={newPlayer.name} onChange={e => setNewPlayerName(e.currentTarget.value)}></input>
                                </form>
                            </td>
                            <td className="updown"><button className="new_button" onClick={e => handleAddNewPlayerButton(e)} >+</button></td>
                        </tr>
                </tbody>
            </table>
        </div>
    )
}