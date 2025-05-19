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

const BrowserPieChart = ({
  title,
  chartData,
  chartConfig,
}: {
  title: string;
  chartData: { label: string; value: number; fill: string }[];
  chartConfig: ChartConfig;
}) => {
  return (
    <Card className="flex flex-col h-full">
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
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default BrowserPieChart;
