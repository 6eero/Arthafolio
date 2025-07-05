import { makeApiRequest } from "@/Configs/api/makeApiRequest";

export const searchDashboard = async () => {
  const { data, headers } = await makeApiRequest(`/api/holdings`, "GET");
  return { data, headers };
};

export const addHolding = async ({
  ticker,
  quantity,
}: {
  ticker: string;
  quantity: number;
}) => {
  const options = {
    body: { ticker, quantity },
  };

  const { data, headers } = await makeApiRequest(
    `/api/holdings`,
    "POST",
    options
  );

  return { data, headers };
};
