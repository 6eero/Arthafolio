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
import { Banknote } from "lucide-react";
import { useState } from "react";
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

const Dashboard = () => {
  const context = useDashboardSearchContext();
  const { onLoad } = useDashboardSearchActions();
  const t = useTranslations("");
  const [isManageAssetModalOpen, setIsManageAssetModalOpen] = useState(false);
  const [clickedAsset, setClickedAsset] = useState({ label: "", quantity: 0 });

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
            <SummaryCard
              itemKey={`dashboard.totals.total`}
              icon={Banknote}
              value={totals.total}
            />
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
