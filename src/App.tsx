import { useEffect } from "react";
import { useRoutes } from "react-router-dom";
import routes from "./routes";

const App = () => {
  const title = "347Online.me";
  useEffect(() => {
    document.title = title;
  }, []);

  const content = useRoutes(routes);

  return (
    <>
      {content}
    </>
  );
}

export default App;
