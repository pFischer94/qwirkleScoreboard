import { Player } from "../../api/playersApi";

type Props = {
    player: Player;
};

export function PlayerCard({ player }: Props) {
    return (
        <div className="player-card">
            {player.name}
            {player.gamePoints}
            {player.gameBiggestTurn}
        </div>
    )
}