import { Player } from "../../api/playersApi";

type Props = {
    player: Player;
};

export function PlayerCard({ player }: Props) {
    return (
        <div className="player-card">
            <h2>{player.name}</h2>
            <span>Punkte: {player.gameBiggestTurn}</span>
            <span>Kombo: {player.gamePoints}</span>
        </div>
    )
}