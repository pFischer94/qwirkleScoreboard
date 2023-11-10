import { createBrowserRouter } from "react-router-dom";
import { Players } from "../components/players/Players";
import { NotFoundPage } from "./NotFound";
import { Game } from "../components/game/Game";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Players,
  },
  {
    path: "/game",
    Component: Game,
  },
  {
    path: "/*",
    Component: NotFoundPage,
  }
]);
