import { useScoreboard } from "../../../hooks/useScoreboard"
import { PlayerCard } from "./PlayerCard";
import "./playerBar.css"

// TODO restructure GamePage like PlayerPage
// TODO end game, localstorage.removeItems

export function PlayerBar() {
    const { playersGame } = useScoreboard();

    // useEffect(() => {
    //     const response = localStorage.getItem("activeIndex");
    //     if (response) {
    //         setActiveIndex(Number(response));
    //     } else {
    //         localStorage.setItem("activeIndex", "0");
    //     }
    //     if (activeIndex >= playersGame.length) {
    //         setActiveIndex(0);
    //         localStorage.setItem("activeIndex", "0");
    //     }
    // }, []);

    return (
        <div className="player-bar-container">
            {playersGame.map((p, index) => 
                <PlayerCard  key={index} index={index} player={p}/>
            )}
        </div>
    )
}