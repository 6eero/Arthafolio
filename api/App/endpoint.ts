import { makeApiRequest } from "@/Configs/api/makeApiRequest";

export const whoAmI = async () => {
  const { data, headers } = await makeApiRequest("/api/who_am_i", "GET");

  return { data, headers };
};
export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const options = {
    body: { email, password },
    apiName: "public",
  };

  const { data, headers } = await makeApiRequest("/api/login", "POST", options);

  return { data, headers };
};

export const logout = async () => {
  const options = {
    body: {},
    apiName: "public",
  };

  const { data, headers } = await makeApiRequest(
    "/api/v1/logout",
    "DELETE",
    options
  );

  return { data, headers };
};
