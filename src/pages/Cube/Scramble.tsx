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

export const Scramble = () => {
  const [algorithm, setAlgorithm] = useState("Scrambling...");
  const [showSettings, setShowSettings] = useState(false);

  const newScramble = async () => {
    const alg = await randomScrambleForEvent("333");
    setAlgorithm(alg.toString());
  };

  useEffect(() => void newScramble(), []);

  const moves = algorithm.split(" ").map((move, index) => (
    <ScrambleTurn key={index} data-color={getFaceColor(move)}>
      {` ${move} `}
    </ScrambleTurn>
  ));

  return (
    <>
      <link rel="manifest" href="/manifest.json" />
      <Grid className="scramble-container">
        <Grid item>
          <ScrambleText>{moves}</ScrambleText>
        </Grid>
        <Grid item>
          <ScrambleButton onScramble={() => void newScramble()} />
        </Grid>
      </Grid>
      <IconButton
        size="large"
        onClick={() => {
          setShowSettings(true);
        }}
      >
        <Settings
          color="primary"
          sx={{ position: "fixed", top: 20, right: 20 }}
        />
      </IconButton>
      <SettingsPanel
        open={showSettings}
        onClose={() => {
          setShowSettings(false);
        }}
      />
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
      maxWidth="640pt"
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

const ScrambleTurn = styled("span")(({ theme }) =>
  Object.fromEntries(
    Object.entries(theme.palette.cube).map(([k, v]) => [
      `&[data-color="${k}"]`,
      { color: v },
    ])
  )
);

type ScrambleButtonProps = ButtonProps & { onScramble: () => void };
const ScrambleButton = ({ onScramble, ...props }: ScrambleButtonProps) => {
  const { autoScramble } = useSettingsStore();

  const handleKeyUp = useCallback(
    (e: KeyboardEvent) => {
      if (e.code === "Space") onScramble();
    },
    [onScramble]
  );

  useEffect(() => {
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyUp]);

  return (
    <Button
      variant="contained"
      size="large"
      endIcon={
        autoScramble && (
          <CircularProgress
            color="secondary"
            variant="determinate"
            value={86}
          />
        )
      }
      onClick={onScramble}
      {...props}
    >
      Scramble
    </Button>
  );
};

type SettingsPanelProps = DrawerProps;
const SettingsPanel = ({ open, ...props }: SettingsPanelProps) => {
  const { autoScramble, toggleAutoScramble } = useSettingsStore();

  return (
    <Drawer open={open} anchor="right" {...props}>
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
  );
};
