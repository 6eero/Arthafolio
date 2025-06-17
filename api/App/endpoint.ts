import { makeApiRequest } from "@/Configs/api/makeApiRequest";
const basePath = "/users";

// WHO AM I
export const whoAmI = async () => {
  const options = {
    body: {},
  };

  const { data, headers } = await makeApiRequest("/who_am_i", "GET", options);

  return { data, headers };
};

// LOGIN
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

  console.log("aaaaaaa", { data, headers });

  return { data, headers };
};

// LOGOUT
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

// RESET_PASSWORD
export const resetPassword = async (values: { email: string }) => {
  const options = {
    body: values,
    apiName: "public",
  };
  const { data, headers } = await makeApiRequest(
    `/api/v1${basePath}/reset_password`,
    "POST",
    options
  );
  return { data, headers };
};

// RESET_PASSWORD da dentro
export const resetPasswordAuth = async (values: { email: string }) => {
  const options = {
    body: values,
  };
  const { data, headers } = await makeApiRequest(
    `${basePath}/auth_reset_password`,
    "POST",
    options
  );
  return { data, headers };
};

// CHANGE_PASSWORD
export const createNewPassword = async ({
  verification_code,
  password,
  password_confirmation,
}: {
  verification_code: string;
  password: string;
  password_confirmation: string;
}) => {
  const options = {
    body: { verification_code, password, password_confirmation },
    apiName: "public",
  };

  const { data, headers } = await makeApiRequest(
    `/api/v1${basePath}/create_new_password`,
    "POST",
    options
  );

  return { data, headers };
};
