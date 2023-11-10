import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/reduxStore";
import { setPlayersDB } from "../redux/slicer";
import { getAllPlayers } from "../api/playersApi";

export function usePlayers() {
    const dispatch = useAppDispatch();
    const playersDB = useAppSelector(state => state.playersDB);
    const playersGame = useAppSelector(state => state.playersGame);

    useEffect(() => {
        const fetch = async () => {
          const players = await getAllPlayers();
          players.sort((a, b) => b.totalBiggestTurn - a. totalBiggestTurn);
          players.sort((a, b) => b.totalPoints - a. totalPoints);
          dispatch(setPlayersDB(players));
        };
        fetch();
    }, []);

    return { dispatch, playersDB, playersGame };
}