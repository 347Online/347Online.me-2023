export const normalize = (value: number, { min = 0, max = 100 }) =>
  ((value - min) * 100) / (max - min);
