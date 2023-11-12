import { useNavigate } from "react-router-dom";
import { Player } from "../../../api/playersApi";
import { usePlayers } from "../../../hooks/usePlayers";
import { deletePlayerGame, swapPlayerGame } from "../../../redux/slicer";
import "./pickTable.css"

export function PickTable() {
    const { playersGame, dispatch } = usePlayers();
    const navigate = useNavigate();

    const startGame = () => {
        navigate("/game");
    }

    const deselect = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, player: Player) => {
        e.preventDefault();
        dispatch(deletePlayerGame(player));
    }

    const up = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number) => {
        e.preventDefault();
        dispatch(swapPlayerGame(index));
    }

    const down = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number) => {
        e.preventDefault();
        dispatch(swapPlayerGame(index + 1));
    }

    const hasDownArrows = false;
    
    return (
        <div className="table-container">
            <div className="table-header">
                <h3>Dieses Spiel</h3>
                {playersGame.length > 1 && <button className="start" onClick={startGame}>Start</button>}
            </div>
            <table>
                <thead>
                    <tr style={{textAlign: "left"}}>
                        <th className="updown"></th>
                        {/* <th className="id">ID</th> */}
                        <th className="name">Name</th>
                        <th className="points">Punkte</th>
                        <th className="top-zug">Top Zug</th>
                        <th className="updown"></th>
                        {hasDownArrows && <th className="updown"></th>}
                    </tr>
                </thead>
                <tbody>
                    {playersGame.map((p, index) => {
                        return (
                            <tr key={index} className={index == playersGame.length - 1 ? "last" : "none"}>
                                <td className="updown"><button onClick={(e) => deselect(e, p)}>{"←"}</button></td>
                                {/* <td className="id">{p.id}</td> */}
                                <td className="name">{p.name}</td>
                                <td className="points">{p.gamePoints}</td>
                                <td className="top-zug">{p.gameBiggestTurn}</td>
                                <td className="updown">{index > 0 && <button onClick={(e) => up(e, index)}>{"↑"}</button>}</td>
                                {hasDownArrows && <td className="updown">{index < playersGame.length - 1 && <button onClick={(e) => down(e, index)}>{"↓"}</button>}</td>}
                            </tr>
                        )})}
                </tbody>
            </table>
        </div>
    )
}