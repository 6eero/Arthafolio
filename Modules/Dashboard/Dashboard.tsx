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
import LineChart from "@/components/ui/Charts/LineChart";
import { ChartConfig } from "@/components/ui/chart";
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

  console.log("value", R.propOr(0, "value", totalETF));

  const liquidityVsInvestedData: PieChartData[] = [
    {
      label: "liquidity",
      value: R.propOr(0, "value", totalLiquidity),
      fill: "#3b82f6",
    },
    {
      label: "invested",
      value: R.subtract(
        R.propOr(0, "value", totalPortfolio),
        R.propOr(0, "value", totalLiquidity)
      ) as any,
      fill: "#ec4899",
    },
  ];
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
      fill: "#3b82f6",
    },
    {
      label: "etf",
      value: R.propOr(0, "value", totalETF),
      fill: "#ec4899",
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
      <div className="grid grid-cols-4 gap-6 auto-rows-auto pt-4">
        {/* Row 1 */}
        <div className="row-start-1 col-start-1">
          <Card
            title="Total"
            value={R.propOr(0, "value", totalPortfolio)}
            currency={R.propOr("", "currency", totalPortfolio)}
            percentage={R.propOr(0, "percentage", totalPortfolio)}
          />
        </div>
        <div className="row-start-1 col-start-2">
          <Card
            title="Liquidity"
            value={R.propOr(0, "value", totalLiquidity)}
            currency={R.propOr("", "currency", totalLiquidity)}
            percentage={R.propOr(0, "percentage", totalLiquidity)}
          />
        </div>
        <div className="row-start-1 col-start-3">
          <Card
            title="Crypto"
            value={R.propOr(0, "value", totalCrypto)}
            currency={R.propOr("", "currency", totalCrypto)}
            percentage={R.propOr(0, "percentage", totalCrypto)}
          />
        </div>
        <div className="row-start-1 col-start-4">
          <Card
            title="ETF & Stocks"
            value={R.propOr(0, "value", totalETF)}
            currency={R.propOr("", "currency", totalETF)}
            percentage={R.propOr(0, "percentage", totalETF)}
          />
        </div>

        {/* Rows 2-3 */}
        <div className=" row-start-2 col-start-1 col-span-3 row-span-2 h-[700px]">
          <LineChart title="History" chartData={history} />
        </div>
        <div className="row-start-2 col-start-4 ">
          <PieChart
            title="Totals"
            chartData={liquidityVsInvestedData}
            chartConfig={liquidityVsInvestedChartConfig}
          />
        </div>
        <div className="row-start-3 col-start-4">
          <PieChart
            title="Investments"
            chartData={assetAllocationData}
            chartConfig={assetAllocationChartConfig}
          />
        </div>
      </div>
    </ResourceLoader>
  );
};

export default Dashboard;
