import { RouteObject } from "react-router-dom";
import Landing from "./components/Landing";
import Social from "./components/Social";
import Scramble from "./components/Scramble/Scramble";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/social",
    element: <Social />
  },
  {
    path: "/cube/scramble",
    element: <Scramble />
  }
];

export default routes;
