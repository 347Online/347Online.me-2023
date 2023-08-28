import { CircularProgress, Typography } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { useScrambleSettings } from "./settings";
import { percentage } from "@/util";

interface ScrambleHandlerProps {
  active: boolean;
  onScramble: () => void;
}

export const ScrambleHandler = ({
  active,
  onScramble,
}: ScrambleHandlerProps) => {
  const { autoScramble, autoScrambleDelaySeconds } = useScrambleSettings();
  const [ticking, setTicking] = useState(false);
  const [scrambleTime, setScrambleTime] = useState(0);
  const delay = autoScrambleDelaySeconds * 100;
  const interval = useRef<ReturnType<typeof setInterval>>();

  const startTimer = useCallback(() => {
    interval.current = setInterval(() => {
      setScrambleTime((time) => (time > delay ? time - delay : time + 10));
    }, 100);
    setTicking(true);
  }, [delay]);

  const stopTimer = useCallback(() => {
    clearInterval(interval.current);
    setTicking(false);
    setScrambleTime(0);
  }, []);

  useEffect(() => {
    if (!active || !ticking) {
      stopTimer();
    }
  });

  const handleScramble = useCallback(() => {
    if (!active) return;

    if (autoScramble && !ticking) {
      startTimer();
    }

    onScramble();
  }, [active, autoScramble, onScramble, startTimer, ticking]);

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

  if (autoScramble && ticking) {
    return (
      <>
        {scrambleTime}
        <CircularProgress
          variant="determinate"
          value={percentage(scrambleTime, delay)}
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
