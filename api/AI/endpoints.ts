import { makeApiRequest } from "@/Configs/api/makeApiRequest";

export const getPortfolioValutation = async () => {
  const { data, headers } = await makeApiRequest(`/api/ai/chat`, "POST");

  return { data, headers };
};
