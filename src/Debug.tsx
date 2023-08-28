type Expose = Record<string, unknown>;

interface Target {
  debug: Expose | undefined;
}

export interface DebugProps {
  expose: Expose;
}

const DEV_MODE = import.meta.env.DEV;
const global = window as unknown as Target;

const assign = (expose: Expose, target: Target = global) => {
  if (DEV_MODE) {
    if (!target.debug) {
      target.debug = {};
    }

    Object.assign(target.debug, expose);
  }
};

export const Debug = ({ expose }: DebugProps) => {
  assign(expose);

  return null;
};
