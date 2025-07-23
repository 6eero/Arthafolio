import { makeApiRequest } from "@/Configs/api/makeApiRequest";

export const sendToDeepseek = async (message: string) => {
  const options = {
    body: { message },
  };

  const { data, headers } = await makeApiRequest(
    `/api/ai/chat`,
    "POST",
    options
  );

  return { data, headers };
};
