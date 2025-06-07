"use client";

import {
  DashboardSearchContext,
  useDashboardSearchContext,
} from "@/Context/Dashboard";
import { ResourceLoader } from "@/components/layout/ResourceLoader";
import { useDashboardSearchActions } from "@/api/tasks";
import * as R from "ramda";
import Header from "@/components/layout/Header";
import SummaryCard from "./components/SummaryCard";
import { Banknote, Bitcoin, Landmark, PiggyBank } from "lucide-react";

type Asset = {
  label: string;
  quantity: number;
  price: number;
  value: number;
  category: number;
  percentage: number;
};

type Totals = {
  total: number;
  [key: string]: number | 0;
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

  const totals = R.pathOr<Totals>({ total: 0 }, ["data", "totals"])(context);

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
        <div className="flex-1 flex flex-col gap-4 sm:m-4 mt-4">
          <div className="flex-[1]">
            {/* Desktop */}
            <div className="hidden xl:flex gap-4">
              <SummaryCard
                title="Total"
                icon={Banknote}
                value={R.prop("total", totals)}
              />
              <SummaryCard
                title="Liquidity"
                icon={PiggyBank}
                value={R.prop("liquidity", totals)}
              />
              <SummaryCard
                title="Cryptocurrencies"
                icon={Bitcoin}
                value={R.prop("crypto", totals)}
              />
              <SummaryCard
                title="ETF"
                icon={Landmark}
                value={R.prop("etf", totals)}
              />
            </div>
            <div className="flex xl:hidden overflow-x-auto gap-4 snap-x snap-mandatory scrollbar-hide">
              {/* Mobile */}
              {R.map(({ title, icon, key }) => (
                <div key={key} className="snap-start flex-shrink-0 w-64">
                  <SummaryCard
                    title={title}
                    icon={icon}
                    value={R.prop(key, totals)}
                  />
                </div>
              ))([
                { title: "Total", icon: Banknote, key: "total" },
                { title: "Liquidity", icon: PiggyBank, key: "liquidity" },
                { title: "Cryptocurrencies", icon: Bitcoin, key: "crypto" },
                { title: "ETF", icon: Landmark, key: "etf" },
              ])}
            </div>
          </div>
          <div className="flex-[2] bg-green-900">2ª riga (2 parti)</div>
          <div className="flex-[2] bg-blue-900">3ª riga (2 parti)</div>
        </div>
      </div>
    </ResourceLoader>
  );
};

export default Dashboard;
