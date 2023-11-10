import { useNavigate } from "react-router-dom";
import "./game.css"
import { PlayerBar } from "./PlayerBar";

export function Game() {
    const navigate = useNavigate();
    
    return (
        <div className="game-container">
            <PlayerBar/>
            <button onClick={() => navigate("/")} className="stop">■</button>
        </div>
    )
}