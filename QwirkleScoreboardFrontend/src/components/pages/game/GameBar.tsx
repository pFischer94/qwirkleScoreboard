import { useEffect } from "react";
import { useScoreboard } from "../../../hooks/useScoreboard";
import { useTurns } from "../../../hooks/useTurns";
import { GameTable } from "./GameTable";
import "./gameBar.css"

export function GameBar() {
    const { undoLastTurn, turns } = useTurns();
    const { reset, startFinishSteps, finishSteps, finish } = useScoreboard();

    const startFinish = () => {
        // TODO > 60
        if (turns.length > -1) {
            if (finishSteps <= -1) {
                startFinishSteps();
            } else if (finishSteps === 0) {
                document.removeEventListener("keypress", keyHandlerF);
                finish();
            }
        }
    };

    const keyHandlerF = (e: KeyboardEvent) => {
        if (e.key === "f" || e.key === "F") {
            e.preventDefault();
            startFinish();
        }
    };

    const keyHandlerX = (e: KeyboardEvent) => {
        if (e.key === "x" || e.key === "X") {
            e.preventDefault();
            document.removeEventListener("keypress", keyHandlerF);
            reset();
        }
    };

    const keyHandlerB = (e: KeyboardEvent) => {
        if (e.key === "b" || e.key === "B") {
            e.preventDefault();
            undoLastTurn();
        }
    };

    useEffect(() => {
        document.addEventListener("keypress", keyHandlerF);
        document.addEventListener("keypress", keyHandlerX);
        document.addEventListener("keypress", keyHandlerB);

        return () => {
            document.removeEventListener("keypress", keyHandlerF);
            document.removeEventListener("keypress", keyHandlerX);
            document.removeEventListener("keypress", keyHandlerB);
        };
    }, [turns]);

    return (
        <div className="game-bar-container">
            <div className="game-table-container">
                <GameTable/>
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