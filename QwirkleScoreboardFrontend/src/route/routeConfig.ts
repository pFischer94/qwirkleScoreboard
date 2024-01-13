import { createBrowserRouter } from "react-router-dom";
import { NotFoundPage } from "./NotFound";
import { withSplit } from "../components/hocs/Test";
import { DBTable } from "../components/pages/players/DBTable";
import { PickTable } from "../components/pages/players/PickTable";
import { PlayerBar } from "../components/pages/game/PlayerBar";
import { GameBar } from "../components/pages/game/GameBar";
import { MobileSetup } from "../components/pages/mobile/MobileSetup";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: withSplit(DBTable, PickTable),
  },
  {
    path: "/game",
    Component: withSplit(PlayerBar, GameBar),
  },
  {
    path: "/mobile",
    Component: MobileSetup,
  },
  {
    path: "/*",
    Component: NotFoundPage,
  }
]);
