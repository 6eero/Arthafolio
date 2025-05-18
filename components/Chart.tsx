"use client";

import { Pie, PieChart } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "#3b82f6", // blue-500
  },
  safari: {
    label: "Safari",
    color: "#22c55e", // green-500
  },
  firefox: {
    label: "Firefox",
    color: "#f97316", // orange-500
  },
  edge: {
    label: "Edge",
    color: "#ec4899", // pink-500
  },
  other: {
    label: "Other",
    color: "#a855f7", // purple-500
  },
} satisfies ChartConfig;

const BrowserPieChart = ({
  title,
  chartData,
}: {
  title: string;
  chartData: { browser: string; visitors: number; fill: string }[];
}) => {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={"60%"}
              outerRadius={"100%"}
            />
            <ChartLegend
              content={<ChartLegendContent nameKey="browser" />}
              className="mt-8 flex flex-wrap justify-center gap-6 text-sm"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default BrowserPieChart;
