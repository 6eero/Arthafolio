import axios from "axios";

const prefix = "http://localhost:3001/";

export const searchDashboard = async () => {
  const { data, headers } = await axios.get(`${prefix}api/holdings`);
  return { data, headers };
};

//   return {
//     data: {
//       assets: [
//         {
//           label: "BTC",
//           quantity: 0.0334706,
//           price: 91734.4550832385,
//           value: 3070.40725230904,
//           category: "crypto",
//           percentage: 73.33,
//         },
//         {
//           label: "ETH",
//           quantity: 0.2178,
//           price: 2279.14365756153,
//           value: 1596.397488616902,
//           category: "crypto",
//           percentage: 11.86,
//         },
//         {
//           label: "SOL",
//           quantity: 3.46,
//           price: 132.906883383482,
//           value: 459.857816506849,
//           category: "crypto",
//           percentage: 10.98,
//         },
//         {
//           label: "DOT",
//           quantity: 17.94,
//           price: 3.50729189992668,
//           value: 602.9208166846847,
//           category: "crypto",
//           percentage: 1.5,
//         },
//         {
//           label: "CRO",
//           quantity: 1104.82,
//           price: 0.0882397907303286,
//           value: 907.4890855946816,
//           category: "crypto",
//           percentage: 2.33,
//         },
//         {
//           label: "EUR",
//           quantity: 7653.87,
//           price: 1,
//           value: 7653.87,
//           category: "liquidity",
//           percentage: 100,
//         },
//         {
//           label: "ENUL.DE",
//           quantity: 2.4532,
//           price: 99.98,
//           value: 199.96,
//           category: "etf",
//           percentage: 100,
//         },
//       ],
// history: [
//   {
//     value: 15170.4,
//   },
//   {
//     value: 22596.39,
//   },
//   {
//     value: 28359.85,
//   },
//   {
//     value: 32602.92,
//   },
//   {
//     value: 39307.48,
//   },
//   {
//     value: 36653.87,
//   },
//   {
//     value: 47199.96,
//   },
//   {
//     value: 48359.85,
//   },
//   {
//     value: 42602.92,
//   },
//   {
//     value: 49307.48,
//   },
//   {
//     value: 56653.87,
//   },
//   {
//     value: 57199.96,
//   },
// ],
//       totals: {
//         crypto: 4187.07245971216,
//         liquidity: 7653.87,
//         etf: 199.96,
//         total: 12040.9024597122,
//       },
//     },

//     headers: {},
//   };
// };

export const addHolding = async (holding: any) => {
  //const { data, headers } = await axios.get(`${prefix}api/holdings`);

  console.log("34957843", { holding });

  return {
    data: {},
    headers: {},
  };
};
