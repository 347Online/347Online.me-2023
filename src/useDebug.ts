type Data = Record<string, unknown>;
export interface DebugProps {
  data: Data;
}

const DEBUG_ENABLED = import.meta.env.DEV;

const expose = (data: Data) => {
  if (DEBUG_ENABLED) Object.assign(window, data);
};

const Debug = ({ data }: DebugProps) => {
  expose(data);

  return null;
};

export const useDebug = () => {
  return { expose, Debug, DEBUG_ENABLED };
};
