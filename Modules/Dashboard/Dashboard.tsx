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
import { Banknote, TrendingUp, TrendingDown } from "lucide-react";
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
import { Tabs } from "@/components/ui/tabs";
import Card from "@/components/custom/Card";
import { useTranslations } from "next-intl";
import Pie from "./components/Charts/Pie";
import Linee from "./components/Charts/Line";
import AssetItem from "./components/AssetItem";
import Button from "@/components/custom/Button";
import DrawerDialog from "@/Modules/Dashboard/components/DrowerDialog";
import DangerModal from "@/components/modals/DangerModal";

const Dashboard = () => {
  const context = useDashboardSearchContext();
  const { onLoad, onRemoveHolding } = useDashboardSearchActions();
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));
  const t = useTranslations("");
  const [isManageAssetModalOpen, setIsManageAssetModalOpen] = useState(false);
  const [isDangerModalOpen, setIsDangerModalOpen] = useState(false);
  const [clickedAsset, setClickedAsset] = useState({ label: "", quantity: 0 });

  const columns = useAssetColumns(
    (asset) => {
      setClickedAsset({ label: asset.label, quantity: asset.quantity });
      setIsManageAssetModalOpen(true);
    },
    (asset) => {
      setClickedAsset({ label: asset.label, quantity: asset.quantity });
      setIsDangerModalOpen(true);
    }
  );

  const totals = R.pathOr<Totals>({ total: 0 }, ["data", "totals"])(context);
  const profitAndLossValue = R.pathOr(0, [
    "data",
    "totals",
    "profit_loss",
    "value",
  ])(context);
  const profitAndLossPercent = R.pathOr(0, [
    "data",
    "totals",
    "profit_loss",
    "percent",
  ])(context);

  const history = R.pathOr([], ["data", "history"])(context);
  const assets = R.pathOr<Asset[]>([], ["data", "assets"])(context);

  console.log(context);

  return (
    <ResourceLoader onLoad={onLoad} context={DashboardSearchContext}>
      <DrawerDialog
        open={isManageAssetModalOpen}
        setOpen={setIsManageAssetModalOpen}
        setClickedAsset={setClickedAsset}
        initialValues={clickedAsset}
      />
      <DangerModal
        title={"dashboard.confirm_delete_asset_modal.title"}
        message={"dashboard.confirm_delete_asset_modal.message"}
        open={isDangerModalOpen}
        setOpen={setIsDangerModalOpen}
        onSubmitClick={() => onRemoveHolding(clickedAsset.label)}
      />
      <div className="w-full flex flex-col">
        <Header title={t("dashboard.title")} />
        <div className="flex-1 flex flex-col gap-4 sm:m-4 mt-4 ">
          {/* Desktop */}
          <div className="h-full hidden xl:flex gap-4">
            <SummaryCard
              itemKey={`dashboard.totals.total`}
              icon={Banknote}
              value={totals.total}
            />
            <SummaryCard
              itemKey={`dashboard.totals.profit_and_loss`}
              icon={profitAndLossValue >= 0 ? TrendingUp : TrendingDown}
              value={profitAndLossValue}
              percentage={profitAndLossPercent}
            />
          </div>
          {/* Mobile */}
          <div className="xl:hidden w-full">
            <Carousel plugins={[plugin.current]}>
              <CarouselContent>
                <CarouselItem>
                  <SummaryCard
                    itemKey={`dashboard.totals.total`}
                    icon={Banknote}
                    value={totals.total}
                  />
                </CarouselItem>
                <CarouselItem>
                  <SummaryCard
                    itemKey={`dashboard.totals.profit_and_loss`}
                    icon={profitAndLossValue >= 0 ? TrendingUp : TrendingDown}
                    value={profitAndLossValue}
                    percentage={profitAndLossPercent}
                  />
                </CarouselItem>
              </CarouselContent>
            </Carousel>
          </div>

          {(R.isNotEmpty(history) || R.isNotEmpty(assets)) && (
            <div className="w-full flex gap-4 xl:flex-row  flex-col">
              <Linee data={history} />
              <Pie data={assets} />
            </div>
          )}

          {/* Desktop */}
          <Card
            className="xl:block hidden"
            title={"dashboard.table.title"}
            description="dashboard.table.description"
            action={
              <Button
                variant="default"
                onClick={() => setIsManageAssetModalOpen(true)}
                className="mr-4"
              >
                {t("dashboard.add_investment")}
              </Button>
            }
          >
            <div className="pt-4">
              <DataTable
                columns={columns}
                data={R.filter((el: Asset) => el.category !== "liquidity")(
                  assets
                )}
              />
            </div>
          </Card>

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
              <Button
                onClick={() => setIsManageAssetModalOpen(true)}
                className="xl:hidden w-full mt-4"
              >
                {t("dashboard.add_investment")}
              </Button>
            </Card>
          </Tabs>
        </div>
      </div>
    </ResourceLoader>
  );
};

export default Dashboard;
