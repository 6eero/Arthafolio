"use client";

import {
  DashboardSearchContext,
  useDashboardSearchContext,
} from "@/Context/Dashboard";
import { ResourceLoader } from "@/components/layout/ResourceLoader";
import { useDashboardSearchActions } from "@/api/tasks";
import * as R from "ramda";

// {
//   "assets": [
//     {
//       "label": "BTC",
//       "quantity": 0.0334706,
//       "price": 91418.966496129,
//       "value": 3059.84766000534
//     },
//     {
//       "label": "ETH",
//       "quantity": 0.2178,
//       "price": 2233.00929840569,
//       "value": 486.349425192759
//     },
//     {
//       "label": "SOL",
//       "quantity": 3.46,
//       "price": 134.596678975621,
//       "value": 465.704509255647
//     },
//     {
//       "label": "DOT",
//       "quantity": 17.94,
//       "price": 3.53846760162442,
//       "value": 63.4801087731421
//     },
//     {
//       "label": "CRO",
//       "quantity": 1104.82,
//       "price": 0.0898864831429295,
//       "value": 99.3083843059714
//     },
//     {
//       "label": "EUR",
//       "quantity": 7653.87,
//       "price": 1,
//       "value": 7653.87
//     }
//   ],
//   "totals": {
//     "total": 11828.5600875329,
//     "crypto": 4174.69008753286,
//     "liquidity": 7653.87
//   }
// }

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
      ciao
    </ResourceLoader>
  );
};

export default Dashboard;
