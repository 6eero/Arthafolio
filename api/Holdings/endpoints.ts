import { makeApiRequest } from "@/Configs/api/makeApiRequest";

export const searchDashboard = async () => {
  const { data, headers } = await makeApiRequest(`/api/holdings`, "GET");
  return { data, headers };
};
