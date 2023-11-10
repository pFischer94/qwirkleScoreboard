import { createBrowserRouter } from "react-router-dom";
import { Players } from "../components/Players";
import { NotFoundPage } from "./NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Players,
  },
  {
    path: "/*",
    Component: NotFoundPage,
  }
]);
