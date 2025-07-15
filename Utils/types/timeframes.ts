export const TIMEFRAMES = {
  H: "hour",
  D: "day",
  W: "week",
  M: "month",
  Y: "year",
} as const;

export type TimeframeKey = keyof typeof TIMEFRAMES; // 'H' | 'D' | 'W' | 'M' | 'Y'
