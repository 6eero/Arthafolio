"use client";
import { CartesianGrid, LabelList, Line, LineChart } from "recharts";
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
          left: 20,
          right: 20,
        }}
      >
        <CartesianGrid vertical={false} />

        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />
        <Line
          dataKey="value"
          type="natural"
          stroke="var(--color-value)"
          strokeWidth={1.5}
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
            fontSize={10}
          />
        </Line>
      </LineChart>
    </ChartContainer>
  );
};

export default Linee;
