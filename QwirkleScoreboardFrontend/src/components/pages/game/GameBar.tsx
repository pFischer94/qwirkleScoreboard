import { useNavigate } from "react-router-dom";
import { GameTable } from "./GameTable";

export function GameBar() {
    const navigate = useNavigate();
    
    return (
        <div className="rigth">
            <div className="game-bar-container">
                <GameTable/>
                <button onClick={() => navigate("/")} className="stop">■</button>
            </div>
        </div>
    )    
}