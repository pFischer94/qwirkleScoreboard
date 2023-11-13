import { useScoreboard } from "../../../hooks/useScoreboard";
import { useTurns } from "../../../hooks/useTurns";
import { GameTable } from "./GameTable";
import "./gameBar.css"

export function GameBar() {
    const { undoLastTurn, turns } = useTurns();
    const { reset, startFinishSteps, finishSteps, finish } = useScoreboard();

    const startFinish = () => {
        // TODO > 60
        if (turns.length > 6) {
            if (finishSteps <= -1) {
                startFinishSteps();
            } else if (finishSteps === 0) {
                finish();
            }
        }
    };

    return (
        <div className="game-bar-container">
            <div className="game-table-container">
                <GameTable/>
                {/* <button onClick={() => navigate("/")} className="stop">■</button>‚ */}
            </div>
            <div className="control">
                <div>
                    <button className="back" onClick={undoLastTurn}>⏮</button>
                    <button className="cancel" onClick={reset}>✕</button>
                    <button className="finish" onClick={startFinish}>✓</button>
                </div>
            </div>
        </div>
    )    
}