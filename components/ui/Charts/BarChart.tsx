"use client";

import { Bar, BarChart, XAxis } from "recharts";

import {
  ChartConfig,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import ChartCard from "./ChartCard";

const chartConfig = {
  inflow: {
    label: "inflow",
    color: "#ffffff",
  },
  outflow: {
    label: "outflow",
    color: "#747474",
  },
} satisfies ChartConfig;

const CustomBarChart = ({
  title,
  description,
  chartData,
}: {
  title: string;
  description: string;
  chartData: { month: string; inflow: number; outflow: number }[];
}) => {
  return (
    <ChartCard
      title={title}
      description={description}
      chartConfig={chartConfig}
    >
      <BarChart accessibilityLayer data={chartData}>
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) =>
            new Date(value + " 1").toLocaleDateString("en-US", {
              month: "short",
            })
          }
        />
        <Bar
          dataKey="inflow"
          stackId="a"
          fill="var(--color-inflow)"
          radius={[0, 0, 4, 4]}
        />
        <Bar
          dataKey="outflow"
          stackId="a"
          fill="var(--color-outflow)"
          radius={[4, 4, 0, 0]}
        />
        <ChartTooltip
          content={<ChartTooltipContent />}
          cursor={false}
          defaultIndex={-1}
        />
      </BarChart>
    </ChartCard>
  );
};

export default CustomBarChart;
