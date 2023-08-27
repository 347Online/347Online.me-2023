import { Settings } from "@mui/icons-material";
import {
  Button,
  ButtonProps,
  Checkbox,
  CircularProgress,
  Drawer,
  DrawerProps,
  FormControlLabel,
  Grid,
  IconButton,
  Slider,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import { randomScrambleForEvent } from "cubing/scramble";
import { useCallback, useEffect, useState } from "react";
import { useSettingsStore } from "./settings";
import { CubeColor } from "@/theme";

const getFaceColor = (move: string): CubeColor => {
  const faceColors: Record<string, CubeColor> = {
    U: "white",
    D: "yellow",
    F: "green",
    B: "blue",
    L: "orange",
    R: "red",
  };
  const matches = move.match(/[UDFBLR]{1}/);
  if (!matches) return "white";

  return faceColors[matches[0]];
};

export const Scramble = () => {
  const [algorithm, setAlgorithm] = useState("Scrambling...");

  const newScramble = () =>
    void (async () => {
      const alg = await randomScrambleForEvent("333");
      setAlgorithm(alg.toString());
    })();

  useEffect(newScramble, []);

  const moves = algorithm.split(" ").map((move, index) => (
    <ScrambleTurn key={index} faceColor={getFaceColor(move)}>
      {` ${move} `}
    </ScrambleTurn>
  ));
  const halfway = Math.ceil(moves.length / 2);
  const firstHalf = moves.slice(0, halfway);
  const secondHalf = moves.slice(halfway);

  return (
    <>
      <link rel="manifest" href="/manifest.json" />
      <Grid className="scramble-container">
        <Grid item>
          <ScrambleText>
            {firstHalf}
            <br />
            {secondHalf}
          </ScrambleText>
        </Grid>
        <Grid item>
          <ScrambleHandler onScramble={newScramble} />
        </Grid>
      </Grid>

      <SettingsPanel />
    </>
  );
};

interface ScrambleTextProps {
  children: React.ReactNode;
}
const ScrambleText = ({ children }: ScrambleTextProps) => {
  const theme = useTheme();

  return (
    <Typography
      variant="h1"
      // maxWidth="640pt"
      fontFamily="Monospace"
      fontWeight="bold"
      fontSize="3em"
      lineHeight="1.1"
      sx={{ padding: theme.spacing(3) }}
    >
      {children}
    </Typography>
  );
};

interface ScrambleTurnProps {
  faceColor: CubeColor;
}
const ScrambleTurn = styled("span")<ScrambleTurnProps>(
  ({ theme, faceColor }) => ({
    color: theme.palette.cube[faceColor],
  })
);

interface ScrambleHandlerProps {
  onScramble: () => void;
}
const ScrambleHandler = ({ onScramble }: ScrambleHandlerProps) => {
  const { autoScramble, autoScrambleDelaySeconds } = useSettingsStore();
  const [scrambleTime, setScrambleTime] = useState(0);
  const [startup, setStartup] = useState(true);

  const handleScramble = useCallback(() => {
    setStartup(false);
    setScrambleTime(0);
    onScramble();
  }, [onScramble]);

  const handleKeyUp = useCallback(
    (e: KeyboardEvent) => {
      if (e.code === "Space") handleScramble();
    },
    [handleScramble]
  );

  const handleClick = useCallback(
    (e: MouseEvent) => {
      handleScramble();
    },
    [handleScramble]
  );

  useEffect(() => {
    document.addEventListener("keyup", handleKeyUp);
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("keyup", handleKeyUp);
      document.removeEventListener("click", handleClick);
    };
  }, [handleKeyUp, handleClick]);

  return (
    <>
      {autoScramble && (
        <CircularProgress
          color="secondary"
          variant="determinate"
          value={scrambleTime / 100}
          sx={{ transition: "none" }}
        />
      )}
      {startup && (
        <Typography variant="h5">Tap, click, or press space to scramble</Typography>
      )}
    </>
  );
};

const SettingsPanel = () => {
  const [showSettings, setShowSettings] = useState(false);
  const { autoScramble, toggleAutoScramble } = useSettingsStore();

  return (
    <>
      <IconButton
        size="large"
        onClick={(e) => {
          e.stopPropagation();
          setShowSettings(true);
        }}
      >
        <Settings
          fontSize="inherit"
          color="primary"
          sx={{ position: "fixed", top: 20, right: 20 }}
        />
      </IconButton>
      <Drawer
        anchor="right"
        open={showSettings}
        onClose={(e: React.SyntheticEvent, reason) => {
          if (reason === "backdropClick") {
            e.stopPropagation();
          }
          setShowSettings(false);
        }}
      >
        <FormControlLabel
          label="Rescramble automatically"
          control={
            <Checkbox
              checked={autoScramble}
              onChange={() => {
                toggleAutoScramble();
              }}
            />
          }
        />

        <FormControlLabel label="Auto-Scramble Delay" control={<Slider />} />
      </Drawer>
    </>
  );
};
