"use client";

import {
  DashboardSearchContext,
  useDashboardSearchContext,
} from "@/Context/Dashboard";
import { ResourceLoader } from "@/components/layout/ResourceLoader";
import { useDashboardSearchActions } from "@/api/Holdings/tasks";
import * as R from "ramda";
import Header from "@/components/layout/Header";
import SummaryCard from "./components/SummaryCard";
import { Banknote, Bitcoin, Landmark } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef, useState } from "react";
import { DataTable } from "./components/DataTable";
import { useAssetColumns } from "@/Models/Dashboard/table";
import { Asset, Totals } from "@/app/types/dashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Card from "@/components/custom/Card";
import { useTranslations } from "next-intl";
import Pie from "./components/Charts/Pie";
import Linee from "./components/Charts/Line";
import AssetItem from "./components/AssetItem";
import Button from "@/components/custom/Button";
import DrawerDialog from "@/Modules/Dashboard/components/DrowerDialog";
import ButtonFloating from "@/components/custom/ButtonFloating";
import { useIsMobile } from "@/hooks/use-mobile";

const Dashboard = () => {
  const context = useDashboardSearchContext();
  const { onLoad } = useDashboardSearchActions();
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));
  const t = useTranslations("");
  const [isManageAssetModalOpen, setIsManageAssetModalOpen] = useState(false);
  const [clickedAsset, setClickedAsset] = useState({ label: "", quantity: 0 });
  const isMobile = useIsMobile();

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
      <DrawerDialog
        open={isManageAssetModalOpen}
        setOpen={setIsManageAssetModalOpen}
        setClickedAsset={setClickedAsset}
        initialValues={clickedAsset}
      />
      <ButtonFloating
        onClick={() => setIsManageAssetModalOpen(true)}
        className="xl:hidden"
      />
      <div className="w-full flex flex-col">
        <Header title={t("dashboard.title")} />
        <div className="flex-1 flex flex-col gap-4 sm:m-4 mt-4 ">
          {/* Desktop */}
          <div className="h-full hidden xl:flex gap-4">
            {R.map(
              ([key, value]) => (
                <SummaryCard
                  key={key}
                  itemKey={`dashboard.totals.${key}`}
                  icon={Banknote}
                  value={value}
                />
              ),
              R.toPairs(totals)
            )}
          </div>
          {/* Mobile */}
          <div className="xl:hidden w-full">
            <Carousel plugins={[plugin.current]}>
              <CarouselContent>
                {R.map(
                  ([key, value]) => (
                    <CarouselItem key={key}>
                      <SummaryCard
                        itemKey={`dashboard.totals.${key}`}
                        icon={
                          {
                            total: Banknote,
                            crypto: Bitcoin,
                            etf: Landmark,
                          }[key] || Banknote
                        }
                        value={value}
                      />
                    </CarouselItem>
                  ),
                  R.toPairs(totals)
                )}
              </CarouselContent>
            </Carousel>
          </div>

          {(R.isNotEmpty(history) || R.isNotEmpty(assets)) && (
            <div className="w-full flex gap-4 xl:flex-row  flex-col">
              {!isMobile && <Linee data={history} />}
              {(!isMobile || R.isNotEmpty(assets)) && <Pie data={assets} />}
            </div>
          )}

          {/* Desktop */}
          <Tabs defaultValue="all" className="xl:block hidden">
            <Card
              title={"dashboard.table.title"}
              description="dashboard.table.description"
              action={
                <div>
                  <Button
                    variant="default"
                    onClick={() => setIsManageAssetModalOpen(true)}
                    className="mr-4"
                  >
                    {t("dashboard.add_investment")}
                  </Button>

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
                </div>
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

          {/* Mobile */}
          <Tabs defaultValue="all" className="xl:hidden">
            <Card>
              <div className="flex justify-between text-sm text-muted-foreground px-2">
                <div className="w-1/3">Quantity</div>
                <div className="w-1/3 text-center">Price</div>
                <div className="w-1/3 text-right">Value</div>
              </div>
              {R.map(
                (asset: Asset) => (
                  <AssetItem
                    key={asset.label}
                    label={asset.label}
                    quantity={asset.quantity}
                    price={asset.price}
                    value={asset.value}
                    percentage={asset.percentage}
                    category={asset.category}
                    setIsManageAssetModalOpen={setIsManageAssetModalOpen}
                    setClickedAsset={setClickedAsset}
                  />
                ),
                assets
              )}
            </Card>
          </Tabs>
        </div>
      </div>
    </ResourceLoader>
  );
};

export default Dashboard;
