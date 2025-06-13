"use client";

import {
  DashboardSearchContext,
  useDashboardSearchContext,
} from "@/Context/Dashboard";
import { ResourceLoader } from "@/components/layout/ResourceLoader";
import { useDashboardSearchActions } from "@/api/tasks";
import * as R from "ramda";
import Header from "@/components/layout/Header";
import SummaryCard from "./components/SummaryCard";
import { Banknote, Bitcoin, Landmark, PiggyBank } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import { DataTable } from "./components/DataTable";
import { useAssetColumns } from "@/Models/Dashboard/table";
import { Asset, Totals } from "@/app/types/dashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Card from "@/components/custom/Card";
import { useTranslations } from "next-intl";
import Pie from "./components/Charts/Pie";
import Linee from "./components/Charts/Line";

const Dashboard = () => {
  const context = useDashboardSearchContext();
  const { onLoad } = useDashboardSearchActions();
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));
  const t = useTranslations("");

  const columns = useAssetColumns();

  const totals = R.pathOr<Totals>({ total: 0 }, ["data", "totals"])(context);
  const history = R.pathOr([], ["data", "history"])(context);
  const assets = R.pathOr<Asset[]>(
    [
      {
        label: "",
        quantity: 0,
        price: 0,
        value: 0,
        category: "",
        percentage: 0,
      },
    ],
    ["data", "assets"]
  )(context);

  return (
    <ResourceLoader onLoad={onLoad} context={DashboardSearchContext}>
      <div className="w-full flex flex-col">
        <Header title={t("dashboard.title")} />
        <div className="flex-1 flex flex-col gap-4 sm:m-4 mt-4 ">
          {/* Desktop */}
          <div className="h-full hidden xl:flex gap-4">
            <SummaryCard
              itemKey="dashboard.totals.total"
              icon={Banknote}
              value={R.propOr(0, "total", totals)}
            />
            <SummaryCard
              itemKey="dashboard.totals.liquidity"
              icon={PiggyBank}
              value={R.propOr(0, "liquidity", totals)}
            />
            <SummaryCard
              itemKey="dashboard.totals.crypto"
              icon={Bitcoin}
              value={R.propOr(0, "crypto", totals)}
            />
            <SummaryCard
              itemKey="dashboard.totals.etf"
              icon={Landmark}
              value={R.propOr(0, "etf", totals)}
            />
          </div>
          {/* Mobile */}
          <div className="xl:hidden w-full">
            <Carousel plugins={[plugin.current]}>
              <CarouselContent>
                <CarouselItem>
                  <SummaryCard
                    itemKey="dashboard.totals.total"
                    icon={Banknote}
                    value={R.propOr(0, "total", totals)}
                  />
                </CarouselItem>
                <CarouselItem>
                  <SummaryCard
                    itemKey="dashboard.totals.liquidity"
                    icon={PiggyBank}
                    value={R.propOr(0, "liquidity", totals)}
                  />
                </CarouselItem>
                <CarouselItem>
                  <SummaryCard
                    itemKey="dashboard.totals.crypto"
                    icon={Bitcoin}
                    value={R.propOr(0, "crypto", totals)}
                  />
                </CarouselItem>
                <CarouselItem>
                  <SummaryCard
                    itemKey="dashboard.totals.etf"
                    icon={Landmark}
                    value={R.propOr(0, "etf", totals)}
                  />
                </CarouselItem>
              </CarouselContent>
            </Carousel>
          </div>

          <div className="w-full flex gap-4 xl:flex-row  flex-col">
            <div className="w-full xl:h-[450px]  bg-card text-card-foreground rounded-xl border p-6 shadow-sm xl:w-5/8 flex flex-col">
              <p className="leading-none font-semibold pb-2">
                {t("dashboard.charts.linechart.title")}
              </p>
              <p className="text-muted-foreground text-sm">
                {t("dashboard.charts.linechart.description")}
              </p>

              <div className="flex-1 min-h-0 w-full">
                <Linee data={history} />
              </div>
            </div>
            <div className="w-full h-[450px] bg-card text-card-foreground rounded-xl border p-6 shadow-sm xl:w-3/8 flex flex-col">
              <p className="leading-none font-semibold pb-2">
                {t("dashboard.charts.piechart.title")}
              </p>
              <p className="text-muted-foreground text-sm">
                {t("dashboard.charts.piechart.description")}
              </p>

              <div className="flex-1 min-h-0 w-full pt-5">
                <Pie
                  data={R.filter((el: Asset) => el.category !== "liquidity")(
                    assets
                  )}
                />
              </div>
            </div>
          </div>
          <Tabs defaultValue="all">
            <Card
              title={"dashboard.table.title"}
              description="dashboard.table.description"
              action={
                <TabsList>
                  <TabsTrigger value="all">
                    {t("generic.categories.all")}
                  </TabsTrigger>
                  <TabsTrigger value="cryptocurrencies">
                    {t("generic.categories.crypto")}
                  </TabsTrigger>
                  <TabsTrigger value="etf">
                    {t("generic.categories.etf")}
                  </TabsTrigger>
                </TabsList>
              }
            >
              <TabsContent value="all">
                <DataTable
                  columns={columns}
                  data={R.filter((el: Asset) => el.category !== "liquidity")(
                    assets
                  )}
                />
              </TabsContent>
              <TabsContent value="cryptocurrencies">
                <DataTable
                  columns={columns}
                  data={R.filter((el: Asset) => el.category === "crypto")(
                    assets
                  )}
                />
              </TabsContent>
              <TabsContent value="etf">
                <DataTable
                  columns={columns}
                  data={R.filter((el: Asset) => el.category === "etf")(assets)}
                />
              </TabsContent>
            </Card>
          </Tabs>
        </div>
      </div>
    </ResourceLoader>
  );
};

export default Dashboard;
