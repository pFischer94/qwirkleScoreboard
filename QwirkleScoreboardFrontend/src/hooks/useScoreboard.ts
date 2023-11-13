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
    // if (playersGame.length === 0) {
    //   console.log("useScoreboard useEffect playersGame.length = 0: " + playersGame.length);
    //   // dispatch(setPlayersGame(JSON.parse(localStorage.getItem("playersGame") ?? "")));
    //   // dispatch(setRunning(Boolean(localStorage.getItem("isRunning") ?? "false")));
    //   // dispatch(setActiveIndex(Number(localStorage.getItem("activeIndex") ?? "0")));
    // }
    fetch();
    // console.log(`useScoreboard useEffect isRunning: ${isRunning},  activeIndex: ${activeIndex}, `);
  }, []);

  const incrementActiveIndex = () => {
    const newActiveIndex = (activeIndex + 1) % playersGame.length;
    // console.log("incrementActiveIndex newActiveIndex: " + newActiveIndex)
    dispatch(setActiveIndex(newActiveIndex));
    // console.log("incrementActiveIndex activeIndex: " + activeIndex)
  }

  const decrementActiveIndex = () => {
    const incremented = activeIndex - 1;
    // console.log("decrementActiveIndex incremented: " + incremented);
    if (incremented >= 0) {
      const newActiveIndex = (incremented) % playersGame.length;
      dispatch(setActiveIndex(newActiveIndex));
      // console.log("decrementActiveIndex activeIndex: " + activeIndex);
    } else {
      dispatch(setActiveIndex(playersGame.length - 1));
    }
  }

  // const getIsRunning = () => {
  //   const stored = localStorage.getItem("isRunning");
  //   if (!stored) {
  //     localStorage.setItem("isRunning", isRunning + "");
  //   } else {
  //     dispatch(setRunning(Boolean(stored)));
  //   }
  // }

  const setIsRunning = (isGameRunning: boolean) => {
    // localStorage.setItem("isRunning", isGameRunning + "");
    dispatch(setRunning(isGameRunning));
  }

  // const getPlayersGame = () => playersGame;

  const deletePlayer = (player: Player) => {
    dispatch(deletePlayerGame(player));
  }

  const insertPlayer = (player: Player) => {
    dispatch(insertPlayerGame(player));
  }

  const swapPlayer = (index: number) => {
    dispatch(swapPlayerGame(index));
  }

  // const getPlayersDB = () => playersDB;

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