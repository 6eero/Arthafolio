import { Asset, History } from "@/app/types/dashboard";
import { Suspense } from "react";
import Linee from "./Charts/Line";
import * as R from "ramda";
import Pie from "./Charts/Pie";

const ChartsSection = ({
  history,
  assets,

  isMobile,
}: {
  history: History[];
  assets: Asset[];

  isMobile: boolean;
}) => {
  const hasData = R.isNotEmpty(history) || R.isNotEmpty(assets);

  if (!hasData) return null;

  return (
    <div className="w-full flex gap-4 xl:flex-row flex-col">
      <Suspense>
        <Linee data={history} />
      </Suspense>
      {!isMobile && (
        <Suspense>
          <Pie data={assets} />
        </Suspense>
      )}
    </div>
  );
};

export default ChartsSection;
