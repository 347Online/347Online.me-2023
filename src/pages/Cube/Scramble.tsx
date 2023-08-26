import { Settings } from "@mui/icons-material";
import { Button, Container, IconButton, LinearProgress } from "@mui/material";
import { randomScrambleForEvent } from "cubing/scramble";
import { useEffect, useState } from "react";
import "./Scramble.css";

export const Scramble = () => {
  const [algorithm, setAlgorithm] = useState("Scrambling...");

  const scramble = async () => {
    const alg = await randomScrambleForEvent("333");
    setAlgorithm(alg.toString());
  };

  useEffect(() => {
    void scramble();

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        void scramble();
      }
    };

    window.addEventListener("keyup", handleKeyPress);

    return () => {
      window.removeEventListener("keyup", handleKeyPress);
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

  const moves = algorithm.split(" ").map((move, index) => (
    <span key={index} className="move" data-color={getFaceColor(move)}>
      {` ${move} `}
    </span>
  ));

  return (
    <>
      <link rel="manifest" href="/manifest.json" />
      <div className="scramble-container">
        <div>
          <h1 className="scramble-text">{moves}</h1>
          <LinearProgress variant="determinate" value={50}/>
        </div>
        <Button
          variant="contained"
          size="large"
          onClick={() => void scramble()}
        >
          Scramble
        </Button>
      </div>
      <IconButton size="large">
        <Settings
          color="primary"
          sx={{ position: "fixed", top: 20, right: 20 }}
        />
      </IconButton>
    </>
  );
};
