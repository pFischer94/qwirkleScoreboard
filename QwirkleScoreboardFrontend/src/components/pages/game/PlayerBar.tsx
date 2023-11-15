import { useNavigate } from "react-router-dom";
import { useScoreboard } from "../../../hooks/useScoreboard"
import { PlayerCard } from "./PlayerCard";
import "./playerBar.css"
import { useEffect } from "react";

export function PlayerBar() {
    const { playersGame } = useScoreboard();
    const navigate = useNavigate();

        useEffect(() => {
            if (playersGame.length === 0) {
                navigate("/");
            }
        }, []);

    return (
        <div className="player-bar-container">
            {playersGame.map((p, index) => 
                <PlayerCard  key={index} index={index} player={p}/>
            )}
        </div>
    )
}