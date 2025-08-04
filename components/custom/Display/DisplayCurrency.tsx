import { useGlobalContext } from "@/Context/Global";
import { useUserSettings } from "@/hooks/useUserSettings";

const DisplayCurrency = ({
  value,
  minimumFractionDigits = 2,
  maximumFractionDigits = 6,
  showSign = false,
  className,
}: {
  value: number;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  showSign?: boolean;
  className?: string;
}) => {
  const userContext = useGlobalContext();
  const { currency, hideHoldings } = useUserSettings(userContext);

  const formatted = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: minimumFractionDigits,
    maximumFractionDigits: maximumFractionDigits,
  }).format(value);

  const sign = value >= 0 ? "+" : "";

  return (
    <p className={className}>
      {hideHoldings
        ? `**** ${currency}`
        : showSign
        ? `${sign}${formatted} ${currency}`
        : `${formatted} ${currency}`}
    </p>
  );
};

export default DisplayCurrency;
