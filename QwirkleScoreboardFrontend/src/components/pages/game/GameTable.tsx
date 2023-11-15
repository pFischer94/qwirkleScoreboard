import { useScoreboard } from "../../../hooks/useScoreboard";
import "../../hocs/test.css"
import "./gameTable.css"

export function GameTable() {
    const { playersGame } = useScoreboard();
    
    return (
        <div className="table-container">
            <div className="table-header">
                <h3 className="right">Dieses Spiel</h3>
            </div>
            <table className="game">
                <thead>
                    <tr>
                        <th className="name">Name</th>
                        <th className="points">Punkte</th>
                        <th className="top-zug">Top Zug</th>
                    </tr>
                </thead>
                <tbody className="game">
                    {playersGame
                            .slice()
                            .sort((a, b) => b.gameBiggestTurn - a. gameBiggestTurn)
                            .sort((a, b) => b.gamePoints - a. gamePoints)
                            .map((p, index) => {
                        return (
                            <tr key={index} className={(index + playersGame.length) % 2 !== 0 ? "darker" : "none"}>
                                <td className="name">{p.name}</td>
                                <td className="points">{p.gamePoints}</td>
                                <td className="top-zug">{p.gameBiggestTurn}</td>
                            </tr>
                        )})}
                </tbody>
            </table>
        </div>
    )
}