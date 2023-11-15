import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/reduxStore";
import { deletePlayerGame, insertPlayerGame, setPlayersDB, swapPlayerGame, insertPlayerDB, setRunning, setActiveIndex, resetGame, setFinishSteps } from "../redux/slicer";
import { Player, getAllPlayers, updatePlayers } from "../api/playersApi";
import { useNavigate } from "react-router-dom";

export function useScoreboard() {
  const dispatch = useAppDispatch();
  const playersDB = useAppSelector(state => state.playersDB);
  const playersGame = useAppSelector(state => state.playersGame);
  const isRunning = useAppSelector(state => state.isRunning);
  const activeIndex = useAppSelector(state => state.activeIndex);
  const finishSteps = useAppSelector(state => state.finishSteps);
  const navigate = useNavigate();

  // localStorage keys: "isRunning", "activeIndex", "playersGame"
  // TODO alle localStorage uses in diese custom hook, localStorage allg.

  const fetch = useCallback(async () => {
    const players = await getAllPlayers();
    players.sort((a, b) => b.totalBiggestTurn - a. totalBiggestTurn);
    players.sort((a, b) => b.totalPoints - a. totalPoints);
    dispatch(setPlayersDB(players));
  }, [getAllPlayers, dispatch, setPlayersDB]);

  useEffect(() => {
    fetch();
  }, []);

  const incrementActiveIndex = () => {
    const newActiveIndex = (activeIndex + 1) % playersGame.length;
    dispatch(setActiveIndex(newActiveIndex));
  }

  const decrementActiveIndex = () => {
    const incremented = activeIndex - 1;
    if (incremented >= 0) {
      const newActiveIndex = (incremented) % playersGame.length;
      dispatch(setActiveIndex(newActiveIndex));
    } else {
      dispatch(setActiveIndex(playersGame.length - 1));
    }
  }

  const setIsRunning = (isGameRunning: boolean) => {
    dispatch(setRunning(isGameRunning));
  }

  const deletePlayer = (player: Player) => {
    dispatch(deletePlayerGame(player));
  }

  const insertPlayer = (player: Player) => {
    dispatch(insertPlayerGame(player));
  }

  const swapPlayer = (index: number) => {
    dispatch(swapPlayerGame(index));
  }

  const insertPlayerDatabase = (player: Player) => {
    dispatch(insertPlayerDB(player));
  }
    
  const reset = () => {
    localStorage.clear();
    dispatch(resetGame());
    navigate("/");
  };

  const finish = async () => {
    console.log(await updatePlayers(playersGame));
    reset();
  };

  const startFinishSteps = () => {
    dispatch(setFinishSteps(playersGame.length - 1));
  }

  const decrementFinishSteps = () => {
    dispatch(setFinishSteps(finishSteps - 1));
  }

  const incrementFinishSteps = () => {
    dispatch(setFinishSteps(finishSteps + 1));
  }

  return {
    isRunning, setIsRunning, 
    playersGame, deletePlayer, insertPlayer, swapPlayer, 
    playersDB, insertPlayerDatabase ,
    activeIndex, incrementActiveIndex, decrementActiveIndex,
    reset, finish, 
    finishSteps, startFinishSteps, decrementFinishSteps,incrementFinishSteps, 
  };
}