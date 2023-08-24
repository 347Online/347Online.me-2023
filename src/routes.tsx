import { RouteObject } from "react-router-dom";
import Landing from "./components/Landing";
import Social from "./components/Social";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/social",
    element: <Social />,
  },
];

export default routes;
