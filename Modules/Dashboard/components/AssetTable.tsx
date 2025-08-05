import { Asset } from "@/app/types/dashboard";
import Card from "@/components/custom/Card";
import { Tabs } from "@/components/ui/tabs";
import AssetItem from "./AssetItem";
import Button from "@/components/custom/Buttons/Button";
import { Sparkles } from "lucide-react";
import { Suspense } from "react";
import { DataTable } from "./DataTable";
import { ColumnDef } from "@tanstack/react-table";

const MobileAssetList = ({
  assets,
  columns,
  setIsManageAssetModalOpen,
  setClickedAsset,
  onAddInvestment,
  onOpenAISheet,
  t,
}: {
  assets: Asset[];
  columns: ColumnDef<any>[];
  setIsManageAssetModalOpen: (open: boolean) => void;
  setClickedAsset: (asset: any) => void;
  onAddInvestment: () => void;
  onOpenAISheet: () => void;
  t: (key: string) => string;
}) => (
  <>
    {/* Desktop */}
    <Card
      className="sm:block hidden"
      title="dashboard.table.title"
      description="dashboard.table.description"
      action={
        <Button variant="default" onClick={onAddInvestment} className="mr-4">
          {t("dashboard.add_investment")}
        </Button>
      }
    >
      <div className="pt-4">
        <Suspense>
          <DataTable columns={columns} data={assets} />
        </Suspense>
      </div>
    </Card>
    {/* Mobile */}
    <Tabs defaultValue="all" className="sm:hidden">
      <Card className="sm:bg-card bg-transparent sm:border border-0 !p-0 !pt-6">
        <div className="flex justify-between text-sm text-muted-foreground px-2">
          <div className="w-1/3">Quantity</div>
          <div className="w-1/3 text-center">Price</div>
          <div className="w-1/3 text-right">Value</div>
        </div>

        {assets.map((asset) => (
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
        ))}

        <div className="space-y-3 mt-4">
          <Button onClick={onAddInvestment} className="xl:hidden w-full">
            {t("dashboard.add_investment")}
          </Button>

          <Button
            icon={<Sparkles />}
            variant="outline"
            onClick={onOpenAISheet}
            className="xl:hidden w-full"
          >
            {t("dashboard.analize_portfolio")}
          </Button>
        </div>
      </Card>
    </Tabs>
  </>
);

export default MobileAssetList;
