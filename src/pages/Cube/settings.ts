import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SettingsState {
  autoScramble: boolean;
  autoScrambleDelaySeconds: number;
  toggleAutoScramble: (enable?: boolean) => void;
  setAutoScrambleDelay: (seconds: number) => void;
  resetSettings: () => void;
}

const defaults = { autoScramble: false, autoScrambleDelaySeconds: 60 };

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...defaults,
      toggleAutoScramble: (enable) => {
        set((state) => ({ autoScramble: enable ?? !state.autoScramble }));
      },
      setAutoScrambleDelay: (seconds) => {
        set(() => ({ autoScrambleDelaySeconds: seconds }));
      },

      resetSettings: () => {
        set(() => defaults);
      },
    }),
    { name: "cube-settings" }
  )
);
