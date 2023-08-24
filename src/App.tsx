import { useEffect, useState } from "react";
import "./App.css";

import { randomScrambleForEvent } from "cubing/scramble";

function App() {
  const [algorithm, setAlgorithm] = useState("Scrambling...");
  const title = "Katie's Cube Scrambler";

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.code === "Space") {
      e.preventDefault();
      console.log("Space!");
      scramble();
    }
  };

  useEffect(() => {
    document.title = title;
    window.addEventListener("keyup", handleKeyPress);
    scramble();

    return () => window.removeEventListener("keyup", handleKeyPress);
  }, []);

  const scramble = async () => {
    const alg = await randomScrambleForEvent("333");
    setAlgorithm(alg.toString());
  };

  return (
    <>
      <h1>{title}</h1>
      <h2 className="scrambleText">{algorithm}</h2>
      <div className="card">
        <button id="scrambleBtn" onClick={scramble}>
          Scramble
        </button>
      </div>
    </>
  );
}

export default App;
