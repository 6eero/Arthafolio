"use client";

import { Suspense } from "react";
import * as R from "ramda";
import { useTranslations } from "next-intl";

import { DashboardContext, useDashboardContext } from "@/Context/Dashboard";
import { useDashboardActions } from "@/api/Holdings/tasks";
import { useAssetColumns } from "@/Models/Dashboard/table";
import { Asset } from "@/app/types/dashboard";
import { ResourceLoader } from "@/components/layout/ResourceLoader";
import Header from "@/components/layout/Header";
import DangerModal from "@/components/modals/DangerModal";
import { useIsMobile } from "@/hooks/use-mobile";
import { useDashboardData } from "@/hooks/useDashboardData";
import { useModalState } from "@/hooks/useModalState";
import DrawerDialog from "@/Modules/Dashboard/components/DrowerDialog";
import AISheet from "@/Modules/Dashboard/components/AISheet";

import SummaryCards from "./components/SummaryCards";
import ChartsSection from "./components/ChartSection";
import AssetTable from "./components/AssetTable";

const Dashboard = () => {
  const isMobile = useIsMobile();
  const t = useTranslations("");
  const context = useDashboardContext();
  const { onLoad, onRemoveHolding } = useDashboardActions();
  const { totals, history, assets, profitLoss } = useDashboardData(context);

  const {
    isManageAssetModalOpen,
    setIsManageAssetModalOpen,
    isSideSheetOpen,
    setIsSideSheetOpen,
    isDangerModalOpen,
    setIsDangerModalOpen,
    clickedAsset,
    setClickedAsset,
    openManageModal,
    openDangerModal,
    openAISheet,
  } = useModalState();

  const handleEditAsset = (asset: Asset) => {
    openManageModal({ label: asset.label, quantity: asset.quantity });
  };

  const handleDeleteAsset = (asset: Asset) => {
    openDangerModal({ label: asset.label, quantity: asset.quantity });
  };

  const handleConfirmDelete = () => {
    onRemoveHolding(clickedAsset.label);
  };

  const columns = useAssetColumns(handleEditAsset, handleDeleteAsset);

  return (
    <ResourceLoader onLoad={onLoad} context={DashboardContext}>
      <Suspense fallback={null}>
        <DrawerDialog
          open={isManageAssetModalOpen}
          setOpen={setIsManageAssetModalOpen}
          setClickedAsset={setClickedAsset}
          initialValues={clickedAsset}
          assetsLabel={R.pluck("label", assets)}
        />
      </Suspense>

      <Suspense fallback={null}>
        <AISheet open={isSideSheetOpen} setOpen={setIsSideSheetOpen} />
      </Suspense>

      <DangerModal
        title="dashboard.confirm_delete_asset_modal.title"
        message="dashboard.confirm_delete_asset_modal.message"
        open={isDangerModalOpen}
        setOpen={setIsDangerModalOpen}
        onSubmitClick={handleConfirmDelete}
      />
      <div className="w-full flex flex-col">
        <Header title={t("dashboard.title")} />
        <main className="flex-1 flex flex-col gap-4 sm:m-4 mt-4 ">
          <SummaryCards totals={totals} profitLoss={profitLoss} />

          <ChartsSection
            history={history}
            assets={assets}
            isMobile={isMobile}
          />

          <AssetTable
            assets={assets}
            columns={columns}
            setIsManageAssetModalOpen={setIsManageAssetModalOpen}
            setClickedAsset={setClickedAsset}
            onAddInvestment={openManageModal}
            onOpenAISheet={openAISheet}
            t={t}
          />
        </main>
      </div>
    </ResourceLoader>
  );
};

export default Dashboard;
