import { useEffect, useRef, useState } from "react";
import { Player } from "../../../api/playersApi";
import { useScoreboard } from "../../../hooks/useScoreboard";
import "./playerCard.css"
import { useTurns } from "../../../hooks/useTurns";

type Props = {
    index: number;
    player: Player;
};

export function PlayerCard({ index, player }: Props) {
    const [points, setPoints] = useState<string>("");
    const { activeIndex, incrementActiveIndex, finishSteps, decrementFinishSteps } = useScoreboard();
    const { executeTurn, turns } = useTurns();
    const focusRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        finishSteps > 0 && setPoints("-");
        focusRef.current?.focus();
    }, [finishSteps]);

    const sendTurn = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const num = Number(points);
        if (points !== "" && (num >= 0 && num < 85 && finishSteps <= -1) || (finishSteps > 0 && num >= -6 && num < 0)) {
            setPoints("");
            incrementActiveIndex();
            decrementFinishSteps();
            executeTurn(player, num);
        } else {
            if (finishSteps <= -1) {
                setPoints("");
            } else {
                setPoints("-");
            }
        }
    };

    const findLastTurnsPoints = () => {
        const filteredIndex = turns.filter(t => t.player.id === player.id).length - 1;
        if (filteredIndex === -1) {
            return 0;
        }
        const turn = turns.filter(t => t.player.id === player.id)[filteredIndex];
        return turn.pointsAdded;
    }

    const handlePoints = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        const num = Number(val);
        if (finishSteps <= -1) {
            if ((num >= 0 && num <= 84) || val === "" || val === "0") {
                setPoints(e.target.value);
            }
        } else {
            if ((num >= -6 && num <= -1) || val === "-") {
                setPoints(e.target.value);
            }
        }
    };

    return (
        <div className="player-card"  style={{
            backgroundColor: index === activeIndex ? finishSteps < 0 ? "var(--brightBG)" : finishSteps > 0 ? "var(--red)" : "" : "",
            transform: index === activeIndex && finishSteps !== 0 ? "scale(1.15)" : '',
        }}>
            <h2>{player.name}</h2>
            {index === activeIndex && finishSteps !== 0 ?
                <form onSubmit={e => sendTurn(e)}>
                    <label htmlFor="points" style={{"marginRight" : "2px"}} >Punkte:</label>
                    <input id="points" value={points} autoFocus ref={focusRef} onChange={handlePoints}></input>
                </form> :
                <form>
                    <span>Punkte: </span>
                    <span>{findLastTurnsPoints()}</span>
                </form>
            }
        </div>
    )
}