import "./Scramble.css";
import { useEffect, useState } from "react";
import { randomScrambleForEvent } from "cubing/scramble";

const Scramble = () => {
  const [algorithm, setAlgorithm] = useState("Scrambling...");

  const scramble = () => {
    randomScrambleForEvent("333")
      .then((alg) => setAlgorithm(alg.toString()))
      .catch((e) => console.error(e));
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        console.log("Space!");
        scramble();
      }
    };

    window.addEventListener("keyup", handleKeyPress);
    window.addEventListener("click", () => scramble());
    scramble();

    return () => {
      window.removeEventListener("keyup", handleKeyPress);
      window.removeEventListener("click", () => scramble());
    };
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

  const moves = algorithm.split(" ").map((move) => (
    <span className="move" data-color={getFaceColor(move)}>
      {` ${move} `}
    </span>
  ));

  return (
    <div className="scramble-container">
      <h1 className="scramble-text">{moves}</h1>
      <h2>Tap, click, or press space to rescramble</h2>
    </div>
  );
};

export default Scramble;
