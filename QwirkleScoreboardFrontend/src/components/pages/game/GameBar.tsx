import { useNavigate } from "react-router-dom";
import { GameTable } from "./GameTable";
import "./gameBar.css"

export function GameBar() {
    const navigate = useNavigate();
    
    return (
        <div className="game-bar-container">
            <div className="game-table-container">
                <GameTable/>
                {/* <button onClick={() => navigate("/")} className="stop">■</button>‚ */}
            </div>
            <div className="control">
                <div>
                    <button className="back">⏮</button>
                    <button className="skip">⏭</button>
                </div>
                <div>
                    <button className="cancel">✕</button>
                    <button className="finish">✓</button>
                </div>
            </div>
        </div>
    )    
}