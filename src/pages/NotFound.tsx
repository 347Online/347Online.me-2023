import { useRouteError } from "react-router-dom";
import Link from "../components/common/Link";

export const NotFound = () => {
  const error = useRouteError();
  console.warn(error);

  return (
    <div>
      <h1>Uh oh! There's nothing here!</h1>
      <Link to="/">Go home</Link>
    </div>
  );
};
