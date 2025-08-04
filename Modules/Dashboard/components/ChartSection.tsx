import { Asset, History } from "@/app/types/dashboard";
import { Suspense } from "react";
import Linee from "./Charts/Line";
import { Currency } from "@/app/types/user";
import * as R from "ramda";
import Pie from "./Charts/Pie";

const ChartsSection = ({
  history,
  assets,
  hideHoldings,
  currency,
  isMobile,
}: {
  history: History[];
  assets: Asset[];
  hideHoldings: boolean;
  currency: Currency;
  isMobile: boolean;
}) => {
  const hasData = R.isNotEmpty(history) || R.isNotEmpty(assets);

  if (!hasData) return null;

  return (
    <div className="w-full flex gap-4 xl:flex-row flex-col">
      <Suspense>
        <Linee data={history} hideHoldings={hideHoldings} currency={currency} />
      </Suspense>
      {!isMobile && (
        <Suspense>
          <Pie data={assets} hideHoldings={hideHoldings} />
        </Suspense>
      )}
    </div>
  );
};

export default ChartsSection;
