import { useEffect, useState } from "react";
import { usePlayers } from "../../../hooks/usePlayers"
import { PlayerCard } from "./PlayerCard";
import "./playerBar.css"

// TODO restructure GamePage like PlayerPage
// TODO end game, localstorage.removeItems

export function PlayerBar() {
    const { playersGame } = usePlayers();
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const response = localStorage.getItem("activeIndex");
        if (response) {
            setActiveIndex(Number(response));
        } else {
            localStorage.setItem("activeIndex", "0");
        }
    }, []);

    return (
        <div className="player-bar-container">
            {playersGame.map((p, index) => 
                <PlayerCard  key={index} index={index} player={p} activeIndex={activeIndex} setActiveIndex={setActiveIndex}/>
            )}
        </div>
    )
}