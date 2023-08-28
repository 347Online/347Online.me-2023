import { percentage } from "@/util";
import { Grid, LinearProgress, Typography, useTheme } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { useScrambleSettings } from "./settings";

interface ScrambleHandlerProps {
  active: boolean;
  hint: boolean;
  onScramble: () => void;
}

export const ScrambleHandler = ({
  active,
  hint,
  onScramble,
}: ScrambleHandlerProps) => {
  const { autoScramble, autoScrambleDelaySeconds } = useScrambleSettings();
  const [ticking, setTicking] = useState(false);
  const [scrambleTime, setScrambleTime] = useState(0);
  const delay = autoScrambleDelaySeconds * 100;
  const interval = useRef<ReturnType<typeof setInterval>>();
  const theme = useTheme();

  const startTimer = useCallback(() => {
    interval.current = setInterval(() => {
      setScrambleTime((time) => time + 10);
    }, 100);
    setTicking(true);
  }, []);

  const stopTimer = useCallback(() => {
    clearInterval(interval.current);
    setTicking(false);
    setScrambleTime(0);
  }, []);

  const handleScramble = useCallback(() => {
    if (!active) return;

    if (autoScramble && !ticking) {
      startTimer();
    }

    setScrambleTime(0);
    onScramble();
  }, [active, autoScramble, onScramble, startTimer, ticking]);

  useEffect(() => {
    if (!active || !ticking) {
      stopTimer();
    }
  });

  useEffect(() => {
    if (scrambleTime > delay) {
      setScrambleTime(0);
      handleScramble();
    }
  }, [delay, handleScramble, scrambleTime]);

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

  return (
    <Grid
      item
      display="flex"
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "32px" }}
    >
      {autoScramble && ticking ? (
        <LinearProgress
          variant="determinate"
          value={percentage(scrambleTime, delay)}
          sx={{
            width: "80vw",
            maxWidth: "600pt",
            margin: "0 auto",
          }}
        />
      ) : (
        hint && (
          <Typography variant="h5" flexDirection={"row"}>
            Tap, click, or press space to scramble
          </Typography>
        )
      )}
    </Grid>
  );
};
