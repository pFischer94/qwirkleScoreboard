import { usePlayers } from "../../hooks/usePlayers"
import { PlayerCard } from "./PlayerCard";

export function PlayerBar() {
    const { playersGame } = usePlayers();

    return (
        <div className="player-bar-container">
            {playersGame.map(p => <PlayerCard player={p}/>)}
        </div>
    )
}