export type Asset = {
  label: string;
  quantity: number;
  price: number;
  value: number;
  category: "liquidity" | "crypto" | "etf" | "";
  percentage: number;
};

export type Totals = {
  total: number;
  [key: string]: number | 0;
};
