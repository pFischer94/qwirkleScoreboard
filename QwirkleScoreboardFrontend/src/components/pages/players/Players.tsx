import { usePlayers } from "../../../hooks/usePlayers";
import { DBTable } from "./DBTable";
import { PickTable } from "./PickTable";
// import "./players.css"

// type Props = {
//     players: Player[];
//     setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
//     // nickName und nickName2 sind optional -> muss nicht mitgegeben werden
//     nickName?: string;
//     // dann bei Funktionsaufruf darauf prüfen ob nicht null oder alt. default Wert mitgeben
//     nickName2?: string
// }

export function Players(
// {
//     // hier müssen nicht alle props angegeben werden
//     players, 
//     setPlayers, 
//     // default Wert
//     nickName = "hat keins"
// }: Props
) {

    // TODO remove unused code (css's, components)

    return (
        <>
            <div className="tables_container">
                <DBTable/>
                <PickTable/>
            </div>
        </>
    )
}