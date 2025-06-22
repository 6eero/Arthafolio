import { makeApiRequest } from "@/Configs/api/makeApiRequest";

export const searchDashboard = async () => {
  const { data, headers } = await makeApiRequest(`/holdings`, "GET");
  return { data, headers };
};

export const addHolding = async (holding: any) => {
  //const { data, headers } = await axios.get(`${prefix}api/holdings`);

  return {
    data: {},
    headers: {},
  };
};
