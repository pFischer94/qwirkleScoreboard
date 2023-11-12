import { useState } from "react";
import { usePlayers } from "../../../hooks/usePlayers"
import { PlayerCard } from "./PlayerCard";
import "./playerBar.css"

// TODO restructure GamePage like PlayerPage

export function PlayerBar() {
    const { playersGame } = usePlayers();
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="player-bar-container">
            {playersGame.map((p, index) => 
                <PlayerCard  key={index} index={index} player={p} activeIndex={activeIndex} setActiveIndex={setActiveIndex}/>
            )}
        </div>
    )
}