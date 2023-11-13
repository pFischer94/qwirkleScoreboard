import axios from "axios";

export type Player = {
    id: number;
    name: string;
    gamePoints: number;
    totalPoints: number;
    turns: number;
    gameBiggestTurn: number;
    totalBiggestTurn: number;
}

const SERVER_URL = "http://localhost:8080"
const BASE_URL = SERVER_URL + "/player"

export async function getAllPlayers() : Promise<Player[]> {
    const response = await axios.get(BASE_URL);
    return response.data;
}

export async function postNewPlayer(player: Player) : Promise<Player> {
    const response = await axios.post(BASE_URL, player);
    // console.log("postNewPlayer output:");
    // console.log(response);
    return response.data;
}