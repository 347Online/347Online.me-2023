import { useEffect } from "react";
import Scramble from "./components/Scramble/Scramble";

const App = () => {
  const title = "Katie's Cube Scrambler";
  useEffect(() => {
    document.title = title;
  }, []);

  return (
    <>
      <Scramble />
    </>
  );
}

export default App;
