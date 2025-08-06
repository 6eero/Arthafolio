import { useState } from "react";

interface ClickedAsset {
  label: string;
  quantity: number;
}

export const useModalState = () => {
  const [isManageAssetModalOpen, setIsManageAssetModalOpen] = useState(false);
  const [isSideSheetOpen, setIsSideSheetOpen] = useState(false);
  const [isDangerModalOpen, setIsDangerModalOpen] = useState(false);
  const [clickedAsset, setClickedAsset] = useState<ClickedAsset>({
    label: "",
    quantity: 0,
  });

  const openManageModal = (asset?: Partial<ClickedAsset>) => {
    if (asset) {
      setClickedAsset({
        label: asset.label || "",
        quantity: asset.quantity || 0,
      });
    }
    setIsManageAssetModalOpen(true);
  };

  const openDangerModal = (asset: ClickedAsset) => {
    setClickedAsset(asset);
    setIsDangerModalOpen(true);
  };

  const openAISheet = () => {
    setIsSideSheetOpen(true);
  };

  return {
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
  };
};
