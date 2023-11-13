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
                        {/* <th className="updown"></th> */}
                        {/* <th className="id">ID</th> */}
                        <th className="name">Name</th>
                        <th className="points">Punkte</th>
                        <th className="top-zug">Top Zug</th>
                        {/* <th className="transparent"></th> */}
                        {/* {hasDownArrows && <th className="updown"></th>} */}
                    </tr>
                </thead>
                <tbody className="game">
                    {playersGame.map((p, index) => {
                        return (
                            <tr key={index} className={index == playersGame.length - 1 ? "last" : "none"}>
                                {/* <td className="updown"><button onClick={(e) => deselect(e, p)}>{"←"}</button></td> */}
                                {/* <td className="id">{p.id}</td> */}
                                <td className="name">{p.name}</td>
                                <td className="points">{p.gamePoints}</td>
                                <td className="top-zug">{p.gameBiggestTurn}</td>
                                {/* <td className="transparent"><button className="transparent"></button></td> */}
                                {/* {hasDownArrows && <td className="updown">{index < playersGame.length - 1 && <button onClick={(e) => down(e, index)}>{"↓"}</button>}</td>} */}
                            </tr>
                        )})}
                </tbody>
            </table>
        </div>
    )
}