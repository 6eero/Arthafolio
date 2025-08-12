export type DashboardData = {
  totals: Totals;
  history: History[];
  assets: Asset[];
  profitLoss: {
    day: ProfitLoss;
    week: ProfitLoss;
    month: ProfitLoss;
  };
  priceHistory: PriceHistory[];
};

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

export type History = {
  taken_at: string;
  total_value: number;
};
export type PriceHistory = {
  time: string;
  price: number;
};

export type ProfitLoss = {
  value: number;
  percent: number;
};
