"use client";

import {
  DashboardSearchContext,
  useDashboardSearchContext,
} from "@/Context/Dashboard";
import { ResourceLoader } from "@/components/layout/ResourceLoader";
import { useDashboardSearchActions } from "@/api/tasks";
import * as R from "ramda";
import Header from "@/components/layout/Header";

type Asset = {
  label: string;
  quantity: number;
  price: number;
  value: number;
  category: number;
  percentage: number;
};

const Dashboard = () => {
  const context = useDashboardSearchContext();
  const { onLoad } = useDashboardSearchActions();

  const getHoldingsByCategory = (category: number) =>
    R.pipe(
      R.pathOr<Asset[]>([], ["data", "assets"]),
      R.filter((el: Asset) => el.category === category)
    );

  const cryptoHoldings = getHoldingsByCategory(0)(context);
  const liquidityHoldings = getHoldingsByCategory(1)(context);
  const etfHoldings = getHoldingsByCategory(2)(context);

  const totals = R.pathOr([], ["data", "totals"])(context);

  console.log("38579283457", {
    totals,
    cryptoHoldings,
    liquidityHoldings,
    etfHoldings,
  });

  return (
    <ResourceLoader onLoad={onLoad} context={DashboardSearchContext}>
      <div className="w-full h-full flex flex-col">
        <Header
          title={"Holdings"}
          buttons={[
            {
              variant: "default",
              text: "Add",
              onClick: () => {},
            },
            {
              variant: "outline",
              text: "Remove",
              onClick: () => {},
            },
          ]}
        />
        <div className="flex-1 flex flex-col">
          <div className="flex-[1] bg-red-500">1ª riga (1 parte)</div>
          <div className="flex-[2] bg-green-500">2ª riga (2 parti)</div>
          <div className="flex-[2] bg-blue-500">3ª riga (2 parti)</div>
        </div>
      </div>
    </ResourceLoader>
  );
};

export default Dashboard;
