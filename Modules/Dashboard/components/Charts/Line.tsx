"use client";
import { CartesianGrid, LabelList, Line, LineChart, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Asset } from "@/app/types/dashboard";
import { useTranslations } from "next-intl";
import { useIsMobile } from "@/hooks/use-mobile";

const Linee = ({ data }: { data: Asset[] }) => {
  const t = useTranslations("dashboard.charts.linechart");
  const isMobile = useIsMobile();
  const chartConfig = {
    total_value: {
      label: "Desktop",
      color: "var(--chart-5)",
    },
  } satisfies ChartConfig;

  return (
    <div className="w-full xl:h-[450px]  bg-card text-card-foreground rounded-xl border sm:p-6 p-4 shadow-sm xl:w-5/8 flex flex-col">
      <p className="leading-none font-semibold pb-2">{t("title")}</p>
      <p className="text-muted-foreground text-sm">{t("description")}</p>

      <div className="flex-1 min-h-0 w-full">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              top: 20,
              left: 25,
              right: 25,
            }}
          >
            <CartesianGrid vertical={false} />

            <YAxis domain={["dataMin - 5", "dataMax + 5"]} hide />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Line
              dataKey="total_value"
              type="natural"
              stroke="var(--foreground)"
              strokeWidth={1.5}
              dot={{
                fill: "var(--color-value)",
              }}
              activeDot={{
                r: 6,
              }}
            >
              {!isMobile && (
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                />
              )}
            </Line>
          </LineChart>
        </ChartContainer>
      </div>
    </div>
  );
};

export default Linee;
