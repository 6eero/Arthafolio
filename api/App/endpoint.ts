import { makeApiRequest } from "@/Configs/api/makeApiRequest";

export const whoAmI = async () => {
  const { data, headers } = await makeApiRequest("/api/who_am_i", "GET");

  return { data, headers };
};
export const login = async ({
  username_or_email,
  password,
}: {
  username_or_email: string;
  password: string;
}) => {
  const options = {
    body: { username_or_email, password },
  };

  const { data, headers } = await makeApiRequest("/api/login", "POST", options);

  return { data, headers };
};

export const logout = async () => {
  const { data, headers } = await makeApiRequest("/api/logout", "DELETE");

  return { data, headers };
};

export const updatePreferences = async ({
  preferred_currency,
  hide_holdings,
}: {
  preferred_currency: string;
  hide_holdings: boolean;
}) => {
  const options = {
    body: { preferred_currency, hide_holdings },
  };
  const { data, headers } = await makeApiRequest(
    "/api/user/update_preferences",
    "PATCH",
    options
  );
  return { data, headers };
};
