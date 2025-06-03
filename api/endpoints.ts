import axios from "axios";

const prefix = "http://localhost:3001/";

export const searchDashboard = async () => {
  //const { data, headers } = await axios.get(`${prefix}api/holdings`);

  //console.log({ data, headers });

  return {
    data: {
      assets: [
        {
          label: "BTC",
          quantity: 0.0334706,
          price: 91183.9603620769,
          value: 3051.98186369493,
          category: 0,
          percentage: 73.3,
        },
        {
          label: "ETH",
          quantity: 0.2178,
          price: 2223.12487076871,
          value: 484.196596853425,
          category: 0,
          percentage: 11.63,
        },
        {
          label: "SOL",
          quantity: 3.46,
          price: 134.414964117587,
          value: 465.075775846852,
          category: 0,
          percentage: 11.17,
        },
        {
          label: "DOT",
          quantity: 17.94,
          price: 3.53085352915808,
          value: 63.343512313096,
          category: 0,
          percentage: 1.52,
        },
        {
          label: "CRO",
          quantity: 1104.82,
          price: 0.0895150848335421,
          value: 98.898056025794,
          category: 0,
          percentage: 2.38,
        },
        {
          label: "EUR",
          quantity: 7653.87,
          price: 1,
          value: 7653.87,
          category: 1,
          percentage: null,
        },
      ],
      totals: {
        total: 11817.3658047341,
        crypto: 4163.4958047341,
        liquidity: 7653.87,
      },
    },

    headers: {},
  };
};

export const addHolding = async (holding: any) => {
  //const { data, headers } = await axios.get(`${prefix}api/holdings`);

  console.log("34957843", { holding });

  return {
    data: {
      assets: [
        {
          label: "BTC",
          quantity: 1.0334706,
          price: 91183.9603620769,
          value: 305100.98186369493,
          category: 0,
          percentage: 73.3,
        },
        {
          label: "ETH",
          quantity: 0.2178,
          price: 2223.12487076871,
          value: 484.196596853425,
          category: 0,
          percentage: 11.63,
        },
        {
          label: "SOL",
          quantity: 3.46,
          price: 134.414964117587,
          value: 465.075775846852,
          category: 0,
          percentage: 11.17,
        },
        {
          label: "DOT",
          quantity: 17.94,
          price: 3.53085352915808,
          value: 63.343512313096,
          category: 0,
          percentage: 1.52,
        },
        {
          label: "CRO",
          quantity: 1104.82,
          price: 0.0895150848335421,
          value: 98.898056025794,
          category: 0,
          percentage: 2.38,
        },
        {
          label: "EUR",
          quantity: 7653.87,
          price: 1,
          value: 7653.87,
          category: 1,
          percentage: null,
        },
      ],
      totals: {
        total: 11817.3658047341,
        crypto: 4163.4958047341,
        liquidity: 7653.87,
      },
    },

    headers: {},
  };
};
