"use client";
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Asset } from "@/app/types/dashboard";

const Linee = ({ data }: { data: Asset[] }) => {
  const chartConfig = {
    value: {
      label: "Desktop",
      color: "var(--chart-5)",
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <LineChart
        accessibilityLayer
        data={data}
        margin={{
          top: 20,
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />
        <Line
          dataKey="value"
          type="natural"
          stroke="var(--color-value)"
          strokeWidth={2}
          dot={{
            fill: "var(--color-value)",
          }}
          activeDot={{
            r: 6,
          }}
        >
          <LabelList
            position="top"
            offset={12}
            className="fill-foreground"
            fontSize={12}
          />
        </Line>
      </LineChart>
    </ChartContainer>
  );
};

export default Linee;
