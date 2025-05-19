export const searchDashboard = async () => {
  const data = {
    totals: {
      portfolio: { value: 10000, currency: "€", percentage: 12.5 },
      liquidity: { value: 6000, currency: "€", percentage: -45.23 },
      crypto: { value: 3000, currency: "€", percentage: 23.35 },
      etf: { value: 1000, currency: "€", percentage: 19.5 },
    },
    history: [
      { month: "January 2025", value: 1806 },
      { month: "February 2025", value: 3005 },
      { month: "March 2025", value: 2307 },
      { month: "April 2025", value: 7003 },
      { month: "May 2025", value: 2009 },
      { month: "June 2025", value: 2104 },
    ],
  };
  const headers = {};
  console.log("endpoint");
  return { data, headers };
};
