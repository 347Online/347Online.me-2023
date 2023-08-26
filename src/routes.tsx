import { RouteObject } from "react-router-dom";
import { Scramble } from "./pages/Cube/Scramble";
import { Landing } from "./pages/Landing";
import { Social } from "./pages/Social";
import { NotFound } from "./pages/NotFound";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Landing />,
    errorElement: <NotFound />,
  },
  {
    path: "/social",
    element: <Social />,
  },
  {
    path: "/cube/scramble",
    element: <Scramble />,
  },
];
