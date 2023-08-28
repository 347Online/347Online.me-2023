import { CubeColor } from "@/theme";

export const getFaceColor = (move: string): CubeColor => {
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
