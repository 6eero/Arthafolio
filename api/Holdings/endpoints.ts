import { makeApiRequest } from "@/Configs/api/makeApiRequest";

export const searchDashboard = async () => {
  const { data, headers } = await makeApiRequest(`/api/holdings`, "GET");
  return { data, headers };
};

export const addHolding = async ({
  label,
  quantity,
}: {
  label: string;
  quantity: number;
}) => {
  const category = "crypto";
  const options = {
    body: { label, quantity, category },
  };

  const { data, headers } = await makeApiRequest(
    `/api/holdings`,
    "POST",
    options
  );

  return { data, headers };
};
