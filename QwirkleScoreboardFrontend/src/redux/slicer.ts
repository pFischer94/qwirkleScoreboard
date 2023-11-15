import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Player } from "../api/playersApi";
import { Turn } from "../hooks/useTurns";

type StateType = {
    playersDB: Player[],
    playersGame: Player[],
    isRunning: boolean,
    activeIndex: number,
    turns: Turn[],
    finishSteps: number,
};

const initialState: StateType = {
    isRunning: false,
    activeIndex: 0,
    finishSteps: -1,
    playersGame: [],
    playersDB: [],
    turns: [],
};

const shopSlicer = createSlice({
    name: "qwirkle",
    initialState: initialState,
    reducers: {
        setFinishSteps: (state, action: PayloadAction<number>) => {
            state.finishSteps = action.payload;
            return state;
        },
        resetGame: (state) => {
            state = initialState;
            return state;
        },
        addTurn: (state, action: PayloadAction<Turn>) => {
            state.turns.push(action.payload);
            return state;
        },
        undoTurn: (state) => {
            state.turns.pop();
            return state;
        },
        setActiveIndex: (state, action: PayloadAction<number>) => {
            state.activeIndex = action.payload;
            return state;
        },
        setRunning: (state, action: PayloadAction<boolean>) => {
            state.isRunning = action.payload;
            return state;
        },
        setPlayersDB: (state, action: PayloadAction<Player[]>) => {
            state.playersDB = action.payload;
            return state;
        },
        insertPlayerDB: (state, action: PayloadAction<Player>) => {
            state.playersDB.push(action.payload);
            return state;
        },
        setPlayersGame: (state, action: PayloadAction<Player[]>) => {
            state.playersGame = action.payload;
            return state;
        },
        insertPlayerGame: (state, action: PayloadAction<Player>) => {
            state.playersGame.push(action.payload);
            return state;
        },
        updatePlayerGame: (state, action: PayloadAction<Player>) => {
            const index = state.playersGame.findIndex(p => p.id === action.payload.id);
            state.playersGame[index] = action.payload;
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

export const { 
    setPlayersDB, insertPlayerDB, 
    insertPlayerGame, updatePlayerGame, deletePlayerGame, swapPlayerGame, setPlayersGame, 
    setRunning, resetGame, setFinishSteps,
    setActiveIndex, 
    addTurn, undoTurn
} = shopSlicer.actions;
export const reducer = shopSlicer.reducer;