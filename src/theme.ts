import { createTheme } from "@mui/material";

const cube = {
  white: "#EBEBEB",
  yellow: "gold",
  green: "#22C822",
  blue: "dodgerblue",
  orange: "darkorange",
  red: "#E62222",
} as const;

export type CubeColor = keyof typeof cube;

declare module "@mui/material/styles" {
  interface Palette {
    cube: typeof cube;
  }

  interface PaletteOptions {
    cube: typeof cube;
  }
}

export const theme = createTheme({
  palette: {
    cube,
    mode: "dark",
    background: { default: "#242424" },
  },
});
