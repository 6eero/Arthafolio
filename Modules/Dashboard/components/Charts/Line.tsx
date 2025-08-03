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
  currency,
}: {
  data: Asset[];
  hideHoldings: boolean;
  currency: "€" | "$";
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
    <div className="w-full xl:h-[450px] sm:bg-card text-card-foreground rounded-xl sm:border sm:p-6 p-0 shadow-sm xl:w-5/8 flex flex-col">
      <div className="flex justify-between items-start pb-4">
        {!isMobile && (
          <div>
            <p className="leading-none font-semibold pb-2">{t("title")}</p>
            <p className="text-muted-foreground text-sm">{t("description")}</p>
          </div>
        )}

        <ToggleGroup
          className={isMobile ? "w-full gap-2" : ""}
          type="single"
          size="sm"
          variant={isMobile ? "default" : "outline"}
          defaultValue={timeframe}
          onValueChange={handleTimeframeChange}
        >
          <ToggleGroupItem className="bg-card sm:bg-transparent" value="H">
            H
          </ToggleGroupItem>
          <ToggleGroupItem className="bg-card sm:bg-transparent" value="D">
            D
          </ToggleGroupItem>
          <ToggleGroupItem className="bg-card sm:bg-transparent" value="W">
            W
          </ToggleGroupItem>
          <ToggleGroupItem className="bg-card sm:bg-transparent" value="M">
            M
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="flex-1 min-h-0 w-full">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: isMobile ? 0 : 25,
              right: isMobile ? 0 : 25,
              top: isMobile ? 0 : 20,
              bottom: 0,
            }}
          >
            {!isMobile && <CartesianGrid strokeDasharray="3 3" />}

            <YAxis domain={["dataMin - 20", "dataMax + 20"]} hide />
            <XAxis
              hide={isMobile}
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
                content={
                  <ChartTooltipContent
                    indicator="line"
                    formatter={(value, name, entry, index, payload: any) => {
                      const date = new Date(payload?.taken_at);
                      const formattedDate = date.toLocaleString(undefined, {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      });

                      return (
                        <>
                          <div className="text-muted-foreground">
                            {formattedDate}
                          </div>
                          -
                          <div className="text-foreground font-mono font-medium">
                            {`${value.toLocaleString()} ${currency}`}
                          </div>
                        </>
                      );
                    }}
                  />
                }
              />
            )}
            <Line
              dataKey="total_value"
              type="natural"
              stroke="var(--foreground)"
              strokeWidth={isMobile ? 2 : 1.5}
              dot={
                isMobile
                  ? false
                  : {
                      fill: "var(--color-value)",
                    }
              }
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
