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

  const getFaceColor = (move: string): string => {
  const faceColors = {
    U: "white",
    D: "yellow",
    F: "green",
    B: "blue",
    L: "orange",
    R: "red",
  };
    const matches = move.match(/[UDFBLR]{1}/);
    if (!matches) return "white";
    
    const face = matches[0] as keyof typeof faceColors;

    return faceColors[face];
  };

  const scramble = async () => {
    const alg = await randomScrambleForEvent("333");
    setAlgorithm(alg.toString());
  };

  const moves = algorithm.split(" ").map((move) => (
    <span className="move" data-color={getFaceColor(move)}>
      {` ${move} `}
    </span>
  ));

  return (
    <>
      <h1 className="scrambleText">{moves}</h1>
      <div className="card">
        <button id="scrambleBtn" onClick={scramble}>
          Scramble
        </button>
      </div>
    </>
  );
}

export default App;
