import { Asset } from "@/app/types/dashboard";

const AssetItem = ({
  label,
  quantity,
  price,
  value,
  percentage,
  currency,
  hideHoldings,
  setIsManageAssetModalOpen,
  setClickedAsset,
}: Asset & {
  setIsManageAssetModalOpen: (value: boolean) => void;
  setClickedAsset: (value: { label: string; quantity: number }) => void;
  currency: string;
  hideHoldings: boolean;
}) => {
  const handleAssetClick = () => {
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
          <p className="text-left text-muted-foreground">
            {hideHoldings ? "****" : quantity}
          </p>
        </div>

        <div className="w-1/3 text-center">
          <p className="font-medium">
            {price} {currency}
          </p>
        </div>

        <div className="w-1/3 text-right">
          <p className="font-medium">
            {hideHoldings ? `**** ${currency}` : `${value} ${currency}`}
          </p>
          <p className="text-muted-foreground">{percentage} %</p>
        </div>
      </div>
    </div>
  );
};

export default AssetItem;
