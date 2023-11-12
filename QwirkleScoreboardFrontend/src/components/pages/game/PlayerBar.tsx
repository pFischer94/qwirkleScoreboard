import { useEffect } from "react";
import { usePlayers } from "../../../hooks/usePlayers"
import { PlayerCard } from "./PlayerCard";
// import "./game.css"

export function PlayerBar() {
    // FIXME reload deletes playersGame
    const { playersGame } = usePlayers();

    useEffect(() => {
        if (playersGame.length === 0) {
            // navigate("/");
        }
    })

    return (
        <div className="left">
            <div className="player-bar-container">
                {playersGame.map((p, index) => <PlayerCard index={index} player={p}/>)}
            </div>
        </div>
    )
}