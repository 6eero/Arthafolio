export const searchDashboard = async () => {
  const data = {
    totals: {
      portfolio: { value: 1250.34, currency: "$", percentage: 12.5 },
      liquidity: { value: 2345.12, currency: "$", percentage: -45.23 },
      crypto: { value: 123.33, currency: "$", percentage: 23.35 },
      etf_stocks: { value: 3245.11, currency: "$", percentage: 19.5 },
    },
  };
  const headers = {};
  console.log("endpoint");
  return { data, headers };
};
