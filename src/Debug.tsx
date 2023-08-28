export interface DebugProps {
  expose: Record<string, unknown>;
}

const DEV_MODE = import.meta.env.DEV;

export const Debug = ({ expose }: DebugProps) => {
  if (DEV_MODE) {
    Object.assign(window, expose);
  }

  return null;
};
