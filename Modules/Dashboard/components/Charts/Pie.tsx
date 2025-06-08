"use client";
import { Pie, PieChart } from "recharts";
import {
  ChartContainer,
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
    <ChartContainer config={chartConfig} className="mx-auto max-h-[350px]">
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="label"
          innerRadius={60}
          label={({ payload, ...props }) => {
            return (
              <text
                cx={props.cx}
                cy={props.cy}
                x={props.x}
                y={props.y}
                textAnchor={props.textAnchor}
                dominantBaseline={props.dominantBaseline}
                fill="var(--muted-foreground)"
              >
                {payload.label}
              </text>
            );
          }}
        />
      </PieChart>
    </ChartContainer>
  );
};

export default Piee;
