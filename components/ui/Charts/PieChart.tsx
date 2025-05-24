"use client";

import { Pie, PieChart } from "recharts";

import {
  ChartConfig,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import ChartCard from "./ChartCard";

const BrowserPieChart = ({
  title,
  description,
  chartData,
  chartConfig,
}: {
  title: string;
  description: string;
  chartData: { label: string; value: number; fill: string }[];
  chartConfig: ChartConfig;
}) => {
  return (
    <ChartCard
      title={title}
      description={description}
      chartConfig={chartConfig}
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="label"
          innerRadius={"60%"}
          outerRadius={"100%"}
        />
        <ChartLegend
          content={<ChartLegendContent nameKey="label" />}
          className="mt-8 flex flex-wrap justify-center gap-6 text-sm"
        />
      </PieChart>
    </ChartCard>
  );
};

export default BrowserPieChart;
