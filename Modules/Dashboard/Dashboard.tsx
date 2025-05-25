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
import colors from "@/lib/colors";

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
  const cryptoAllocation = R.pathOr([], ["composition"])(totalCrypto);

  const liquidityVsInvestedData: PieChartData[] = [
    {
      label: "liquidity",
      value: R.propOr(0, "value", totalLiquidity),
      fill: colors.white,
    },
    {
      label: "invested",
      value: R.subtract(
        R.propOr(0, "value", totalPortfolio),
        R.propOr(0, "value", totalLiquidity)
      ) as any,
      fill: colors.gray_0,
    },
  ];

  const assetAllocationData: PieChartData[] = [
    {
      label: "crypto",
      value: R.propOr(0, "value", totalCrypto),
      fill: colors.gray_0,
    },
    {
      label: "etf",
      value: R.propOr(0, "value", totalETF),
      fill: colors.white,
    },
  ];

  const cryptoAllocationData: PieChartData[] = [
    {
      label: "btc",
      value: R.pathOr(0, ["btc", "value"], cryptoAllocation),
      fill: colors.gray_0,
    },
    {
      label: "eth",
      value: R.pathOr(0, ["eth", "value"], cryptoAllocation),
      fill: colors.gray_1,
    },
    {
      label: "sol",
      value: R.pathOr(0, ["sol", "value"], cryptoAllocation),
      fill: colors.gray_2,
    },
    {
      label: "dot",
      value: R.pathOr(0, ["dot", "value"], cryptoAllocation),
      fill: colors.gray_3,
    },
    {
      label: "cro",
      value: R.pathOr(0, ["cro", "value"], cryptoAllocation),
      fill: colors.gray_4,
    },
  ];

  const lineChartConfig = {
    visitors: {
      label: "Visitors",
    },
    value: {
      label: "Value",
      color: colors.white,
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

  const assetAllocationChartConfig: ChartConfig = {
    crypto: {
      label: "Crypto",
    },
    etf: {
      label: "ETF",
    },
  } satisfies ChartConfig;

  const cryptoAllocationChartConfig: ChartConfig = {
    btc: {
      label: "Bitcoin",
    },
    eth: {
      label: "Ethereum",
    },
    sol: {
      label: "Solana",
    },
    cro: {
      label: "Cronos",
    },
    dot: {
      label: "Dot",
    },
  } satisfies ChartConfig;

  return (
    <ResourceLoader onLoad={onLoad} context={DashboardSearchContext}>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-4">
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
        <div className="grid auto-rows-min gap-4 md:grid-cols-2">
          <ChartAreaInteractive
            title="History of the portfolio"
            description="Total line chart history"
            chartData={history}
            chartConfig={lineChartConfig}
          />
          <CustomBarChart
            title="Cashflow"
            description="Monthly inflow and outflow"
            chartData={cashflow}
          />
        </div>
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <PieChart
            title="Totals"
            description="Total asset allocation"
            chartData={liquidityVsInvestedData}
            chartConfig={liquidityVsInvestedChartConfig}
          />
          <PieChart
            title="Investments"
            description="Liquidity and invested"
            chartData={assetAllocationData}
            chartConfig={assetAllocationChartConfig}
          />
          <PieChart
            title="Crypto"
            description="Crypto allocation"
            chartData={cryptoAllocationData}
            chartConfig={cryptoAllocationChartConfig}
          />
        </div>
      </div>
    </ResourceLoader>
  );
};

export default Dashboard;
