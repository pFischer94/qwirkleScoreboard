import { Player } from "../api/playersApi";
import { useAppDispatch, useAppSelector } from "../redux/reduxStore";
import { addTurn, undoTurn, updatePlayerGame } from "../redux/slicer";
import { useScoreboard } from "./useScoreboard";

export type Turn = {
    player: Player;
    pointsAdded: number;
    previousBiggestTurnGame: number;
    previousBiggestTurnDB: number;
};

export function useTurns() {
    const turns = useAppSelector(state => state.turns);
    const dispatch = useAppDispatch();
    const { decrementActiveIndex, incrementFinishSteps } = useScoreboard();

    const executeTurn = (player: Player, points: number) => {
        const turn: Turn = {
            player: player,
            pointsAdded: points,
            previousBiggestTurnGame: player.gameBiggestTurn,
            previousBiggestTurnDB: player.totalBiggestTurn,
        };
        dispatch(addTurn(turn));

        const newPlayer: Player = {
            id: player.id,
            name: player.name,
            gamePoints: player.gamePoints + points,
            totalPoints: player.totalPoints + points,
            turns: player.turns + 1,
            gameBiggestTurn: player.gameBiggestTurn < points ? points : player.gameBiggestTurn,
            totalBiggestTurn: player.totalBiggestTurn < points ? points : player.totalBiggestTurn,
        };
        // dispatch(deletePlayerGame(player));
        // dispatch(insertPlayerGame(newPlayer))
        dispatch(updatePlayerGame(newPlayer));
    }

    const undoLastTurn = () => {
        const turnToUndo = turns[turns.length - 1];
        const player = turnToUndo.player;
        const newPlayer: Player = {
            id: player.id,
            name: player.name,
            gamePoints: player.gamePoints,
            totalPoints: player.totalPoints,
            turns: player.turns,
            gameBiggestTurn: turnToUndo.previousBiggestTurnGame,
            totalBiggestTurn: turnToUndo.previousBiggestTurnDB,
        };
        dispatch(updatePlayerGame(newPlayer));
        dispatch(undoTurn());
        decrementActiveIndex();
        incrementFinishSteps();
    };

    return { turns, executeTurn, undoLastTurn };
};