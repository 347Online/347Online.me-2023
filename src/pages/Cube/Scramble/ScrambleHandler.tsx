import { CircularProgress, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useScrambleSettings } from "./settings";

interface ScrambleHandlerProps {
  active: boolean;
  onScramble: () => void;
}

export const ScrambleHandler = ({
  active,
  onScramble,
}: ScrambleHandlerProps) => {
  const { autoScramble, autoScrambleDelaySeconds } = useScrambleSettings();
  const [scrambleTime, setScrambleTime] = useState(0);
  const [startup, setStartup] = useState(true);

  const handleScramble = useCallback(() => {
    if (!active) return;
    onScramble();
  }, [active, onScramble]);

  const handleKeyUp = useCallback(
    (e: KeyboardEvent) => {
      if (e.code === "Space") handleScramble();
    },
    [handleScramble]
  );

  const handleClick = useCallback(() => {
    handleScramble();
  }, [handleScramble]);

  useEffect(() => {
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
  });

  if (autoScramble && !startup) {
    return (
      <>
        {scrambleTime}
        <CircularProgress
          variant="determinate"
          value={scrambleTime / 10}
          sx={{ transition: "none" }}
        />
      </>
    );
  } else {
    return (
      <Typography variant="h5">
        Tap, click, or press space to scramble
      </Typography>
    );
  }
};
