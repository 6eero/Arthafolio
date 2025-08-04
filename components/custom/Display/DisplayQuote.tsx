import { useGlobalContext } from "@/Context/Global";
import { useUserSettings } from "@/hooks/useUserSettings";

const DisplayQuote = ({
  value,
  minimumFractionDigits = 2,
  maximumFractionDigits = 6,
  className,
}: {
  value: number;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  className?: string;
}) => {
  const userContext = useGlobalContext();
  const { hideHoldings } = useUserSettings(userContext);

  const formatted = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: minimumFractionDigits,
    maximumFractionDigits: maximumFractionDigits,
  }).format(value);

  return <p className={className}>{hideHoldings ? `****` : `${formatted}`}</p>;
};

export default DisplayQuote;
