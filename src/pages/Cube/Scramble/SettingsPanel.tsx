import {
  Checkbox,
  Drawer,
  FormControlLabel,
  IconButton,
  Slider,
} from "@mui/material";
import { useState } from "react";
import { useScrambleSettings } from "./settings";
import { Settings } from "@mui/icons-material";

export const SettingsPanel = () => {
  const [showSettings, setShowSettings] = useState(false);
  const { autoScramble, toggleAutoScramble } = useScrambleSettings();

  return (
    <>
      <IconButton
        size="large"
        onClick={(e) => {
          e.stopPropagation();
          setShowSettings(true);
        }}
        sx={{ position: "fixed", top: 20, right: 20 }}
      >
        <Settings fontSize="inherit" color="primary" />
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
