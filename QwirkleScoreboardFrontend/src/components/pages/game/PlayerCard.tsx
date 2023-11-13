import { useState } from "react";
import { Player } from "../../../api/playersApi";
import { useScoreboard } from "../../../hooks/useScoreboard";
import "./playerCard.css"

type Props = {
    index: number;
    player: Player;
};

export function PlayerCard({ index, player }: Props) {
    const [points, setPoints] = useState<string>("");
    const { activeIndex, incrementActiveIndex } = useScoreboard();

    const sendTurn = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const num = Number(points);
        if (num >= 0 && num < 85) {
            // console.log("sendTurn points: " + points);
            setPoints("");
            incrementActiveIndex();
        }
    };

    return (
        <div className="player-card" style={{
            backgroundColor: index === activeIndex ? "rgb(70, 70, 70)" : '',
            transform: index === activeIndex ? "scale(1.15)" : '',
        }}>
            <h2>{player.name}</h2>
            {index === activeIndex ?
                <form onSubmit={e => sendTurn(e)}>
                    <label style={{"marginRight" : "2px"}} >Punkte:</label>
                    <input value={points} autoFocus onChange={e => setPoints((e.target.value))}></input>
                </form> :
                <form>
                    <label>Punkte: </label>
                    <label>{player.gamePoints}</label>
                </form>
            }
        </div>
    )
}