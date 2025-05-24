"use client";

import * as R from "ramda";
import Card from "@/components/Card";
import {
  DashboardSearchContext,
  useDashboardSearchContext,
} from "@/Context/Dashboard";
import { ResourceLoader } from "@/components/layout/ResourceLoader";
import { useDashboardSearchActions } from "@/api/tasks";
import PieChart from "@/components/ui/Charts/PieChart";
import { ChartConfig } from "@/components/ui/chart";
import CustomBarChart from "@/components/ui/Charts/BarChart";
import ChartAreaInteractive from "@/components/ui/Charts/ChartAreaInteractive";
//import colors from "@/lib/colors";

interface PieChartData {
  label: string;
  value: number;
  fill: string;
}

const Dashboard = () => {
  const context = useDashboardSearchContext();
  const { onLoad } = useDashboardSearchActions();

  const totalPortfolio = R.pathOr("", ["data", "totals", "portfolio"])(context);
  const totalLiquidity = R.pathOr("", ["data", "totals", "liquidity"])(context);
  const totalCrypto = R.pathOr("", ["data", "totals", "crypto"])(context);
  const totalETF = R.pathOr("", ["data", "totals", "etf"])(context);

  const history = R.pathOr([], ["data", "history"])(context);
  const cashflow = R.pathOr([], ["data", "cashflow"])(context);

  console.log("value", R.propOr(0, "value", totalETF));

  const liquidityVsInvestedData: PieChartData[] = [
    {
      label: "liquidity",
      value: R.propOr(0, "value", totalLiquidity),
      fill: "#747474",
    },
    {
      label: "invested",
      value: R.subtract(
        R.propOr(0, "value", totalPortfolio),
        R.propOr(0, "value", totalLiquidity)
      ) as any,
      fill: "#ffffff",
    },
  ];

  const lineChartConfig = {
    visitors: {
      label: "Visitors",
    },
    value: {
      label: "Value",
      color: "#ffffff",
    },
  } satisfies ChartConfig;

  const liquidityVsInvestedChartConfig: ChartConfig = {
    liquidity: {
      label: "Liquidity",
    },
    invested: {
      label: "Invested",
    },
  };

  const assetAllocationData: PieChartData[] = [
    {
      label: "crypto",
      value: R.propOr(0, "value", totalCrypto),
      fill: "#747474",
    },
    {
      label: "etf",
      value: R.propOr(0, "value", totalETF),
      fill: "#ffffff",
    },
  ];

  const assetAllocationChartConfig: ChartConfig = {
    crypto: {
      label: "Crypto",
    },
    etf: {
      label: "ETF",
    },
  } satisfies ChartConfig;

  return (
    <ResourceLoader onLoad={onLoad} context={DashboardSearchContext}>
      <div className="h-screen flex flex-col overflow-hidden gap-4">
        {/* Row 1: Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 shrink-0">
          <Card
            title="Total"
            value={R.propOr(0, "value", totalPortfolio)}
            currency={R.propOr("", "currency", totalPortfolio)}
            percentage={R.propOr(0, "percentage", totalPortfolio)}
          />
          <Card
            title="Liquidity"
            value={R.propOr(0, "value", totalLiquidity)}
            currency={R.propOr("", "currency", totalLiquidity)}
            percentage={R.propOr(0, "percentage", totalLiquidity)}
          />
          <Card
            title="Crypto"
            value={R.propOr(0, "value", totalCrypto)}
            currency={R.propOr("", "currency", totalCrypto)}
            percentage={R.propOr(0, "percentage", totalCrypto)}
          />
          <Card
            title="ETF & Stocks"
            value={R.propOr(0, "value", totalETF)}
            currency={R.propOr("", "currency", totalETF)}
            percentage={R.propOr(0, "percentage", totalETF)}
          />
        </div>

        {/* Row 2: Line Chart */}
        <div className="flex-1 min-h-0 overflow-hidden">
          <ChartAreaInteractive
            title="History of the portfolio"
            description="Total line chart history"
            chartData={history}
            chartConfig={lineChartConfig}
          />
        </div>

        {/* Row 3: Pie Charts + Bar Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1 min-h-0 overflow-hidden">
          <div className="min-h-0 overflow-hidden">
            <PieChart
              title="Totals"
              description="Total asset allocation"
              chartData={liquidityVsInvestedData}
              chartConfig={liquidityVsInvestedChartConfig}
            />
          </div>
          <div className="min-h-0 overflow-hidden">
            <PieChart
              title="Investments"
              description="Liquidity and invested"
              chartData={assetAllocationData}
              chartConfig={assetAllocationChartConfig}
            />
          </div>
          <div className="min-h-0 overflow-hidden">
            <CustomBarChart
              title="Cashflow"
              description="Monthly inflow and outflow"
              chartData={cashflow}
            />
          </div>
        </div>
      </div>
    </ResourceLoader>
  );
};

export default Dashboard;
