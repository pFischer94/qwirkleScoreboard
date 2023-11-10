import { useEffect, useState } from "react";
import { Player } from "../App";
import { getAllPlayers, postNewPlayer } from "../api/playersApi";

type Props = {
    players: Player[];
    setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
    // nickName und nickName2 sind optional -> muss nicht mitgegeben werden
    nickName?: string;
    // dann bei Funktionsaufruf darauf prüfen ob nicht null oder alt. default Wert mitgeben
    nickName2?: string
}

export function Players({
    // hier müssen nicht alle props angegeben werden
    players, 
    setPlayers, 
    // default Wert
    nickName = "hat keins"
}: Props) {
    const [playersAdded, setPlayersAdded] = useState<number>(0);
    const [newPlayerName, setNewPlayerName] = useState<string>("");
    const [activePlayers, setActivePlayers] = useState<Player[]>([]);

    const newPlayer: Player = {
        id: 0,
        name: newPlayerName,
        gamePoints: 0,
        totalPoints: 0,
        turns: 0,
        gameBiggestTurn: 0,
        totalBiggestTurn: 0,
        isSelected: false
    }

    function handleAddNewPlayerButton(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setNewPlayerName(e.currentTarget.name.value);
        postNewPlayer(newPlayer).then(() => {
            setPlayersAdded(playersAdded + 1);
            setNewPlayerName("");
            console.log("success " + playersAdded + nickName);
        }).catch(error => {
            alert(error.response.data.message)
        });
    }

    function handleSelectPlayersButton(e: React.FormEvent<HTMLFormElement>) {
        players.forEach(p => {

        })
    }

    useEffect(() => {
        getAllPlayers().then(setPlayers)

        return () => {
            console.log("unmount playersAdded: " + playersAdded);
        }
      }, [playersAdded])
    
    return (
        <>
            <h1>Players</h1>
            <table>
                <thead>
                    <tr style={{textAlign: "left"}}>
                        <td></td>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Gesamtpunkte</th>
                        <th>Bester Zug</th>
                    </tr>
                </thead>
                <tbody>
                    {players.map(p => {
                        return (
                            <tr key={p.id}>
                                <td><input type="checkbox" id={"isSelected" + p.id} name={"isSelected" + p.id}></input></td>
                                <td>{p.id}</td>
                                <td>{p.name}</td>
                                <td>{p.totalPoints}</td>
                                <td>{p.totalBiggestTurn}</td>
                            </tr>
                        )})}
                </tbody>
            </table>
            <div>
                <form onSubmit={handleAddNewPlayerButton} className="new-player-form">
                    <input name="name" id="name" type="text" value={newPlayer.name} onChange={e => setNewPlayerName(e.currentTarget.value)}></input>
                    <input type="submit" value="Add new Player"/>
                </form>
            </div>
            <button>Select Players</button>
        </>
    )
}