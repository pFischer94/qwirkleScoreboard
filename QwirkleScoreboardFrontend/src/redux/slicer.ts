import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Player } from "../api/playersApi";

type StateType = {
    playersDB: Player[],
    playersGame: Player[],
};

const initialState: StateType = {
    playersDB: [],
    playersGame: [],
};

const shopSlicer = createSlice({
    name: "qwirkle",
    initialState: initialState,
    reducers: {
        setPlayersDB: (state, action: PayloadAction<Player[]>) => {
            state.playersDB = action.payload;
            return state;
        },
        insertPlayerDB: (state, action: PayloadAction<Player>) => {
            state.playersDB.push(action.payload);
            return state;
        },
        insertPlayerGame: (state, action: PayloadAction<Player>) => {
            state.playersGame.push(action.payload);
            return state;
        },
        deletePlayerGame: (state, action: PayloadAction<Player>) => {
            state.playersGame = state.playersGame.filter(p => p.id !== action.payload.id);
            return state;
        },
        swapPlayerGame: (state, action: PayloadAction<number>) => {
            const index = action.payload;
            const tmp = state.playersGame[index];
            state.playersGame[index] = state.playersGame[index - 1];
            state.playersGame[index - 1] = tmp;
            return state;
        },
    }, 
});

export const { setPlayersDB, insertPlayerDB, insertPlayerGame, deletePlayerGame, swapPlayerGame } = shopSlicer.actions;
export const reducer = shopSlicer.reducer;