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
import { useTranslations } from "next-intl";

const chartColors = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
  "var(--chart-6)",
];

const Piee = ({ data }: { data: Asset[] }) => {
  const t = useTranslations("dashboard.charts.piechart");
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
    <div className="w-full h-[450px] bg-card text-card-foreground rounded-xl border sm:p-6 p-4 shadow-sm xl:w-3/8 flex flex-col">
      {<p className="leading-none font-semibold pb-2">{t("title")}</p>}
      <p className="text-muted-foreground text-sm">{t("description")}</p>

      <div className="flex-1 min-h-0 w-full pt-5">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <PieChart>
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
      </div>
    </div>
  );
};

export default Piee;
