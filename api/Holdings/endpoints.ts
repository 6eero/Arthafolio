import { makeApiRequest } from "@/Configs/api/makeApiRequest";
import { TimeframeKey } from "@/Utils/types/timeframes";

export const searchDashboard = async (timeframe: TimeframeKey) => {
  const { data, headers } = await makeApiRequest(`/api/holdings`, "GET", {
    queryParams: { timeframe },
  });
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

export const editHolding = async ({
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
    `/api/holdings/${label}`,
    "PUT",
    options
  );

  return { data, headers };
};

export const removeHolding = async (label: string) => {
  const { data, headers } = await makeApiRequest(
    `/api/holdings/${label}`,
    "DELETE"
  );

  return { data, headers };
};
