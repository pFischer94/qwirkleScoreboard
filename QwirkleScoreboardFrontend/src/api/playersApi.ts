import axios from "axios";
import { Player } from "../App";

const SERVER_URL = "http://localhost:8080"
const BASE_URL = SERVER_URL + "/player"

export async function getAllPlayers() : Promise<Player[]> {
    const response = await axios.get(BASE_URL);
    return response.data;
}

export async function postNewPlayer(player: Player) : Promise<Player> {
    const {isSelected: _, ...playerToAdd} = player;
    const response = await axios.post(BASE_URL, playerToAdd);
    return response.data;
}