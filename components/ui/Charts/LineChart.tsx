"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  value: {
    label: "Value",
    color: "#ffffff",
  },
} satisfies ChartConfig;

const LineChart = ({
  title,
  description,
  chartData,
}: {
  title: string;
  description: string;
  chartData: { month: string; value: number }[];
}) => {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="h-[calc(100%-theme(space.16))]">
        <ChartContainer className="h-full w-full" config={chartConfig}>
          <AreaChart
            data={chartData}
            margin={{
              left: 30,
              right: 30,
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
            <Area
              dataKey="value"
              type="natural"
              fill="var(--color-value)"
              fillOpacity={0.1}
              stroke="var(--color-value)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default LineChart;
