import { useDebug } from "@/useDebug";
import { Grid, useTheme } from "@mui/material";
import { setSearchDebug } from "cubing/search";
import { randomScrambleForEvent } from "cubing/scramble";
import { useEffect, useState } from "react";
import { getFaceColor } from "../util";
import { ScrambleHandler } from "./ScrambleHandler";
import { ScrambleText, ScrambleTurn } from "./ScrambleText";
import { SettingsPanel } from "./SettingsPanel";
import { useScrambleSettings } from "./settings";

export const Scramble = () => {
  const [active, setActive] = useState(true);
  const [hint, setHint] = useState(false);
  const [algorithm, setAlgorithm] = useState("Scrambling...");
  const scrambleSettings = useScrambleSettings();
  const theme = useTheme();
  const { Debug } = useDebug();

  setSearchDebug({ logPerf: false });

  const newScramble = () => {
    void (async () => {
      const alg = await randomScrambleForEvent("333");
      setAlgorithm(alg.toString());
      if (!hint) setHint(true);
    })();
  };

  useEffect(newScramble, [hint]);

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
      <Debug data={{ scrambleSettings }} />
      <Grid
        sx={{
          top: theme.spacing(10),
        }}
      >
        <Grid item mt={0}>
          <ScrambleText>
            {firstHalf}
            <br />
            {secondHalf}
          </ScrambleText>
        </Grid>
        <Grid item>
          <ScrambleHandler
            hint={hint}
            active={active}
            onScramble={newScramble}
          />
        </Grid>
      </Grid>

      <SettingsPanel
        onShow={() => {
          setActive(false);
        }}
        onHide={() => {
          setActive(true);
        }}
      />
    </>
  );
};
