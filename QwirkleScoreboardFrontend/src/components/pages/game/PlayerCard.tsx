import { useState } from "react";
import { Player } from "../../../api/playersApi";
import { usePlayers } from "../../../hooks/usePlayers";
import "./playerCard.css"

type Props = {
    index: number;
    player: Player;
    activeIndex: number;
    setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
};

export function PlayerCard({ index, player, activeIndex, setActiveIndex }: Props) {
    const [points, setPoints] = useState<string>("");
    const { playersGame } = usePlayers();

    const sendTurn = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const num = Number(points);
        if (num >= 0 && num < 85) {
            console.log(points);
            setPoints("");
            if (activeIndex < playersGame.length - 1) {
                setActiveIndex(activeIndex + 1);
            } else {
                setActiveIndex(0);
            }
        }
    };

    return (
        <div className="player-card" style={{
            backgroundColor: index === activeIndex ? "green" : '',
            transform: index === activeIndex ? "scale(1.1) translate(-8px)" : '',
        }}>
            <h2>{player.name}</h2>
            {index === activeIndex ?
                <form onSubmit={e => sendTurn(e)}>
                    <label>Punkte: </label>
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