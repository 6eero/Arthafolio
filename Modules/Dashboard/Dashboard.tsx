"use client";

import {
  DashboardSearchContext,
  useDashboardSearchContext,
} from "@/Context/Dashboard";
import { ResourceLoader } from "@/components/layout/ResourceLoader";
import { useDashboardSearchActions } from "@/api/tasks";
import Card from "@/components/SectionCard";
import * as R from "ramda";
import PageTitle from "@/components/layout/PageTitle";
import AddCryptoModal from "@/Modules/Dashboard/Modals/AddCrypto";
import { useState } from "react";
import { toast } from "sonner";

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
  const { onLoad, onAddHolding } = useDashboardSearchActions();
  const [addHoldingModal, setAddHoldingModal] = useState(false);

  const cryptoHoldings = R.pipe(
    R.pathOr<Asset[]>([], ["data", "assets"]),
    R.filter((el: Asset) => el.category === 0)
  )(context);
  console.log("38579283457", cryptoHoldings);

  return (
    <ResourceLoader onLoad={onLoad} context={DashboardSearchContext}>
      <PageTitle
        title={"Dashboard"}
        buttons={[
          {
            variant: "default",
            label: "Add holding",
            onclick: () => {
              setAddHoldingModal((prev) => !prev);
            },
          },
        ]}
      />
      <div className="w-full h-40 grid grid-cols-5 gap-4">
        {R.map((el: Asset) => (
          <Card
            key={el.label}
            title={el.label}
            value={Number(el.value.toFixed(2))}
            percentage={el.percentage}
          />
        ))(cryptoHoldings)}
      </div>
      <AddCryptoModal
        visible={addHoldingModal}
        onCancel={() => setAddHoldingModal((prev) => !prev)}
        onConfirm={onAddHolding}
      />
    </ResourceLoader>
  );
};

export default Dashboard;
