import { createTheme } from "@mui/material";

export const cubeColors = {
  white: "#EBEBEB",
  yellow: "gold",
  green: "#22C822",
  blue: "dodgerblue",
  orange: "darkorange",
  red: "#E62222",
} as const;

export type CubeColor = keyof typeof cubeColors;

declare module "@mui/material/styles" {
  interface Palette {
    cube: typeof cubeColors;
  }

  interface PaletteOptions {
    cube: typeof cubeColors;
  }
}

export const theme = createTheme({
  palette: {
    cube: cubeColors,
    mode: "dark",
    background: { default: "#242424" },
  },
});
