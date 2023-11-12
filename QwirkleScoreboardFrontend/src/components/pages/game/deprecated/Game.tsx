// import "./game.css"
import { PlayerBar } from "../PlayerBar";
import { GameBar } from "../GameBar";

// TODO remove unused code (css's, components)

export function Game() {
    
    return (
        <div className="game-container">
            <PlayerBar/>
            <GameBar/>
        </div>
    )
}