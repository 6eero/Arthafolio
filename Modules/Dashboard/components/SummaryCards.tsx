import { Totals, DashboardData } from "@/app/types/dashboard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Banknote, TrendingUp, TrendingDown } from "lucide-react";
import { useRef } from "react";
import SummaryCard from "./SummaryCard";

const SummaryCards = ({
  totals,
  profitLoss,
  currency,
  hideHoldings,
}: {
  totals: Totals;
  profitLoss: DashboardData["profitLoss"];
  currency: string;
  hideHoldings: boolean;
}) => {
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));

  const summaryData = [
    {
      key: "dashboard.totals.total",
      icon: <Banknote color="var(--accent)" />,
      value: totals.total,
    },
    {
      key: "dashboard.totals.profit_and_loss_last_day",
      icon:
        profitLoss.day.value >= 0 ? (
          <TrendingUp color="var(--accent)" />
        ) : (
          <TrendingDown color="var(--destructive)" />
        ),
      value: profitLoss.day.value,
      percentage: profitLoss.day.percent,
    },
    {
      key: "dashboard.totals.profit_and_loss_last_week",
      icon:
        profitLoss.week.value >= 0 ? (
          <TrendingUp color="var(--accent)" />
        ) : (
          <TrendingDown color="var(--destructive)" />
        ),
      value: profitLoss.week.value,
      percentage: profitLoss.week.percent,
    },
    {
      key: "dashboard.totals.profit_and_loss_last_month",
      icon:
        profitLoss.month.value >= 0 ? (
          <TrendingUp color="var(--accent)" />
        ) : (
          <TrendingDown color="var(--destructive)" />
        ),
      value: profitLoss.month.value,
      percentage: profitLoss.month.percent,
    },
  ];

  return (
    <>
      {/* Desktop */}
      <div className="h-full hidden xl:flex gap-4">
        {summaryData.map((item) => (
          <SummaryCard
            key={item.key}
            currency={currency}
            hideHoldings={hideHoldings}
            itemKey={item.key}
            icon={item.icon}
            value={item.value}
            percentage={item.percentage}
          />
        ))}
      </div>

      {/* Mobile Carousel */}
      <div className="xl:hidden w-full">
        <Carousel plugins={[plugin.current]}>
          <CarouselContent>
            {summaryData.map((item) => (
              <CarouselItem key={item.key}>
                <SummaryCard
                  currency={currency}
                  hideHoldings={hideHoldings}
                  itemKey={item.key}
                  icon={item.icon}
                  value={item.value}
                  percentage={item.percentage}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </>
  );
};

export default SummaryCards;
