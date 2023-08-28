import {
  Checkbox,
  Drawer,
  DrawerProps,
  FormControlLabel,
  IconButton,
  Slider,
} from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { useScrambleSettings } from "./settings";
import { Settings } from "@mui/icons-material";

interface SettingsPanelProps {
  onShow?: () => void;
  onHide?: () => void;
}

export const SettingsPanel = ({ onShow, onHide }: SettingsPanelProps) => {
  const [showSettings, setShowSettings] = useState(false);
  const { autoScramble, toggleAutoScramble } = useScrambleSettings();

  const handleShow = (e: SyntheticEvent) => {
    e.stopPropagation();

    setShowSettings(true);
    onShow?.();
  };

  type Reason = "backdropClick" | "escapeKeyDown";
  const handleHide = (e: SyntheticEvent, reason: Reason) => {
    if (reason === "backdropClick") e.stopPropagation();

    setShowSettings(false);
    onHide?.();
  };

  return (
    <>
      <IconButton
        size="large"
        onClick={handleShow}
        sx={{ position: "fixed", top: 20, right: 20 }}
      >
        <Settings fontSize="inherit" color="primary" />
      </IconButton>
      <Drawer anchor="right" open={showSettings} onClose={handleHide}>
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
