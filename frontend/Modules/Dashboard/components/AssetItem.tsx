import { useDashboardActions } from "@/api/Holdings/tasks";
import { Asset } from "@/app/types/dashboard";

import DisplayCurrency from "@/components/custom/Display/DisplayCurrency";
import DisplayQuote from "@/components/custom/Display/DisplayQuote";

const AssetItem = ({
  label,
  quantity,
  price,
  value,
  percentage,
  setIsManageAssetModalOpen,
  setClickedAsset,
}: Asset & {
  setIsManageAssetModalOpen: (value: boolean) => void;
  setClickedAsset: (value: { label: string; quantity: number }) => void;
}) => {
  const { onGetPriceHistory } = useDashboardActions();

  const handleAssetClick = () => {
    onGetPriceHistory(label, 30);
    setIsManageAssetModalOpen(true);
    setClickedAsset({ label, quantity });
  };
  return (
    <div
      className="sm:bg-card w-full mt-3 p-3 rounded-md hover:outline"
      onClick={handleAssetClick}
    >
      <div className="flex justify-between items-center text-sm">
        <div className="w-1/3">
          <p className="text-left font-semibold">{label}</p>
          <DisplayQuote
            className="text-left text-muted-foreground"
            value={quantity}
          />
        </div>

        <div className="w-1/3 text-center">
          <DisplayCurrency className="font-medium" value={price} />
        </div>

        <div className="w-1/3 text-right">
          <DisplayCurrency className="font-medium" value={value} />
          <p className="text-muted-foreground">{percentage} %</p>
        </div>
      </div>
    </div>
  );
};

export default AssetItem;
