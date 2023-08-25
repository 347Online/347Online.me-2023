import { randomScrambleForEvent } from "cubing/scramble";
import "./Scramble.css";
import { useEffect, useState } from "react";

export const Scramble = () => {
  const [algorithm, setAlgorithm] = useState("Scrambling...");

  const scramble = async () => {
    const alg = await randomScrambleForEvent("333");
    setAlgorithm(alg.toString());
  };

  useEffect(() => {
    scramble();

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        scramble();
      }
    };

    window.addEventListener("keyup", handleKeyPress);
    window.addEventListener("click", scramble);

    return () => {
      window.removeEventListener("keyup", handleKeyPress);
      window.removeEventListener("click", scramble);
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
    <>
      <link rel="manifest" href="scramble.sitemanifest" />
      <div className="scramble-container">
        <h1 className="scramble-text">{moves}</h1>
        <h2>Tap, click, or press space to rescramble</h2>
      </div>
    </>
  );
};
