"use client";
import {
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Asset } from "@/app/types/dashboard";
import { useTranslations } from "next-intl";
import { useIsMobile } from "@/hooks/use-mobile";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useDashboardActions } from "@/api/Holdings/tasks";
import { TimeframeKey } from "@/Utils/types/timeframes";
import { useDashboardContext } from "@/Context/Dashboard";
import * as R from "ramda";

const Linee = ({
  data,
  hideHoldings,
}: {
  data: Asset[];
  hideHoldings: boolean;
}) => {
  const t = useTranslations("dashboard.charts.linechart");
  const isMobile = useIsMobile();
  const { onChangeTimeframe } = useDashboardActions();
  const context = useDashboardContext();

  const timeframe = R.propOr("", "timeframe")(context) as string;
  //const componentLoading = R.propOr("", "componentLoading")(context) as string;

  const chartConfig = {
    total_value: {
      label: t("value"),
      color: "var(--chart-5)",
    },
  } satisfies ChartConfig;

  const handleTimeframeChange = (value: TimeframeKey) => {
    if (!value) return;
    onChangeTimeframe(value);
  };

  return (
    <div className="w-full xl:h-[450px] bg-card text-card-foreground rounded-xl border sm:p-6 p-4 shadow-sm xl:w-5/8 flex flex-col">
      <div className="flex justify-between items-start">
        <div>
          <p className="leading-none font-semibold pb-2">{t("title")}</p>
          <p className="text-muted-foreground text-sm">{t("description")}</p>
        </div>
        <ToggleGroup
          type="single"
          size="sm"
          variant="outline"
          defaultValue={timeframe}
          onValueChange={handleTimeframeChange}
        >
          <ToggleGroupItem value="H">H</ToggleGroupItem>
          <ToggleGroupItem value="D">D</ToggleGroupItem>
          <ToggleGroupItem value="W">W</ToggleGroupItem>
          <ToggleGroupItem value="M">M</ToggleGroupItem>
        </ToggleGroup>
      </div>

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
            <CartesianGrid strokeDasharray="3 3" />

            <YAxis domain={["dataMin - 10", "dataMax + 10"]} hide />
            <XAxis
              tick={{ stroke: "var(--muted)" }}
              tickLine={{ stroke: "var(--muted)" }}
              axisLine={false}
              dataKey="taken_at"
              tickFormatter={(value: string) => {
                const date = new Date(value);
                if (timeframe === "H") {
                  // Se timeframe è "D", mostra solo l'ora (es. 14:30)
                  return date.toLocaleTimeString(undefined, {
                    hour: "2-digit",
                    minute: "2-digit",
                  });
                } else {
                  // Altrimenti mostra giorno/mese (es. 13/07)
                  return date.toLocaleDateString(undefined, {
                    day: "2-digit",
                    month: "2-digit",
                  });
                }
              }}
            />

            {!hideHoldings && (
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
            )}
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
              {!isMobile && !hideHoldings && (
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
