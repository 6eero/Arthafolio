"use client";

import PageTitle from "@/components/layout/PageTitle";
import Card from "@/components/Card";
import {
  DashboardSearchContext,
  useDashboardSearchContext,
} from "@/Context/Dashboard";
import { ResourceLoader } from "@/components/layout/ResourceLoader";
import { useDashboardSearchActions } from "@/api/tasks";
import Chart from "@/components/Chart";

// Colori corrispondenti a Tailwind
const chartData = [
  { browser: "chrome", visitors: 275, fill: "#3b82f6" }, // blue-500
  { browser: "safari", visitors: 200, fill: "#22c55e" }, // green-500
  { browser: "firefox", visitors: 187, fill: "#f97316" }, // orange-500
  { browser: "edge", visitors: 173, fill: "#ec4899" }, // pink-500
  { browser: "other", visitors: 90, fill: "#a855f7" }, // purple-500
];

const Dashboard = () => {
  const context = useDashboardSearchContext();
  const { onLoad } = useDashboardSearchActions();
  console.log("context", context);

  return (
    <ResourceLoader onLoad={onLoad} context={DashboardSearchContext}>
      <div className="w-full">
        <PageTitle title="Dashboard" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full gap-4 pt-8">
          <Card
            title="Portfolio Total"
            value={1250.34}
            currency="$"
            percentage={12.5}
          />
          <Card
            title="Liquidity"
            value={439.11}
            currency="$"
            percentage={-32.5}
          />
          <Card title="Crypto" value={14.67} currency="$" percentage={12.5} />
          <Card
            title="ETF & Stocks"
            value={3255.87}
            currency="$"
            percentage={12.5}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full gap-4 pt-8">
          <Chart title="Totals" chartData={chartData} />
          <Chart title="Invested" chartData={chartData} />
          <Chart title="Crypto" chartData={chartData} />
        </div>
      </div>
    </ResourceLoader>
  );
};

export default Dashboard;
