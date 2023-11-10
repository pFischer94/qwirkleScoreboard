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
          const avaiableInvoices = await getAllPlayers();
          dispatch(setPlayersDB(avaiableInvoices));
        };
        fetch();
    }, []);

    return { dispatch, playersDB, playersGame };
}