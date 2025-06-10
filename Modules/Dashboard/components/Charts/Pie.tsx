"use client";
import { Pie, PieChart } from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Asset } from "@/app/types/dashboard";
import { useMemo } from "react";

const chartColors = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
  "var(--chart-6)",
];

const Piee = ({ data }: { data: Asset[] }) => {
  const { chartData, chartConfig } = useMemo(() => {
    const config: Record<string, { label: string; color: string }> = {};
    const transformed = data.map((asset, i) => {
      const color = chartColors[i % chartColors.length];
      config[asset.label] = { label: asset.label, color };
      return {
        label: asset.label,
        value: asset.value,
        fill: color,
      };
    });

    return {
      chartData: transformed,
      chartConfig: config,
    };
  }, [data]);

  return (
    <ChartContainer
      config={chartConfig}
      className="h-full w-full xl:px-[100px]"
    >
      <PieChart width={400} height={400}>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="label"
          innerRadius={"70%"}
          outerRadius={"100%"}
        />
        <ChartLegend
          content={<ChartLegendContent nameKey="label" />}
          className="mt-8 flex-wrap gap-4 *:justify-center"
        />
      </PieChart>
    </ChartContainer>
  );
};

export default Piee;
