import { useState } from "react";
import { Player } from "../../../api/playersApi";

type Props = {
    index: number;
    player: Player;
};

export function PlayerCard({ index, player }: Props) {
    const [points, setPoints] = useState<string>("");

    const sendTurn = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const num = Number(points);
        if (num >= 0 && num < 85) {
            console.log(points);
            setPoints("");
        }
    };

    return (
        <div className="player-card">
            <h2>{player.name}</h2>
            {index === 0 ?
                <form onSubmit={e => sendTurn(e)}>
                    <label>Punkte: </label>
                    <input value={points} autoFocus onChange={e => setPoints((e.target.value))}></input>
                </form> :
                <span>Punkte: {player.gameBiggestTurn}</span>}
        </div>
    )
}