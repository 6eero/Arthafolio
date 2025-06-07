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
import { columns } from "@/Models/Dashboard/table";
import { Asset, Totals } from "@/app/types/dashboard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Dashboard = () => {
  const context = useDashboardSearchContext();
  const { onLoad } = useDashboardSearchActions();
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));

  const totals = R.pathOr<Totals>({ total: 0 }, ["data", "totals"])(context);
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
      <div className="w-full h-full flex flex-col">
        <Header title={"Holdings"} />
        <div className="flex-1 flex flex-col gap-4 sm:m-4 mt-4 ">
          <div className="flex-[1]">
            {/* Desktop */}
            <div className="h-full hidden xl:flex gap-4">
              <SummaryCard
                title="Total"
                icon={Banknote}
                value={R.prop("total", totals)}
              />
              <SummaryCard
                title="Liquidity"
                icon={PiggyBank}
                value={R.prop("liquidity", totals)}
              />
              <SummaryCard
                title="Cryptocurrencies"
                icon={Bitcoin}
                value={R.prop("crypto", totals)}
              />
              <SummaryCard
                title="ETF"
                icon={Landmark}
                value={R.prop("etf", totals)}
              />
            </div>
            {/* Mobile */}
            <div className="xl:hidden w-full">
              <Carousel plugins={[plugin.current]}>
                <CarouselContent>
                  <CarouselItem>
                    <SummaryCard
                      title="Total"
                      icon={Banknote}
                      value={R.prop("total", totals)}
                    />
                  </CarouselItem>
                  <CarouselItem>
                    <SummaryCard
                      title="Liquidity"
                      icon={PiggyBank}
                      value={R.prop("liquidity", totals)}
                    />
                  </CarouselItem>
                  <CarouselItem>
                    <SummaryCard
                      title="Cryptocurrencies"
                      icon={Bitcoin}
                      value={R.prop("crypto", totals)}
                    />
                  </CarouselItem>
                  <CarouselItem>
                    <SummaryCard
                      title="ETF"
                      icon={Landmark}
                      value={R.prop("etf", totals)}
                    />
                  </CarouselItem>
                </CarouselContent>
              </Carousel>
            </div>
          </div>
          <div className="flex-[2]">
            <Card className="h-full"></Card>
          </div>
          <div className="flex-[2] ">
            <Card className="h-full">
              <Tabs defaultValue="all">
                <CardHeader>
                  <div className="sm:flex items-center sm:justify-between pb-3">
                    <div>
                      <CardTitle>Portfolio Investments</CardTitle>
                      <CardDescription className="mt-2">
                        Overview of the assets currently allocated within your
                        investment portfolio.
                      </CardDescription>
                    </div>
                    <TabsList className="sm:mt-0 mt-4">
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="cryptocurrencies">
                        Cryptocurrencies
                      </TabsTrigger>
                      <TabsTrigger value="etf">ETF</TabsTrigger>
                    </TabsList>
                  </div>
                </CardHeader>
                <CardContent>
                  <TabsContent value="all">
                    <DataTable
                      columns={columns}
                      data={R.filter(
                        (el: Asset) => el.category !== "liquidity"
                      )(assets)}
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
                      data={R.filter((el: Asset) => el.category === "etf")(
                        assets
                      )}
                    />
                  </TabsContent>
                </CardContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </div>
    </ResourceLoader>
  );
};

export default Dashboard;
