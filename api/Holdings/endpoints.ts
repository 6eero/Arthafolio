import { makeApiRequest } from "@/Configs/api/makeApiRequest";

export const searchDashboard = async () => {
  const { data, headers } = await makeApiRequest(`/holdings`, "GET");
  return { data, headers };
};
