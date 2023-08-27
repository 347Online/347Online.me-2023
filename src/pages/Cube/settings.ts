import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface SettingsState {
  autoScramble: boolean;
  toggleAutoScramble: () => void;
  resetSettings: () => void;
}

const defaults = { autoScramble: false };

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...defaults,
      toggleAutoScramble: (enable?: boolean) => {
        set((state) => ({ autoScramble: enable ?? !state.autoScramble }));
      },
      resetSettings: () => {
        set(() => defaults);
      },
    }),
    { name: "cube-settings" }
  )
);
