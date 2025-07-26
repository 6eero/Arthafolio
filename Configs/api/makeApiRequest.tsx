import axios from "axios";
import * as R from "ramda";
import { jwtDecode } from "jwt-decode";
import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  setTokens,
} from "@/Utils/tokens";

const notApplyInterceptorEndpoint = [
  "/login",
  "/api/users/reset_password",
  "/api/users/create_new_password",
];

// Utility to check if the access token is expired or about to expire
const isTokenExpired = (token: any) => {
  if (!token) return true;

  const decodedToken: any = jwtDecode(token);
  const currentTime = Date.now() / 1000; // Get current time in seconds

  return decodedToken.exp < currentTime;
};

const refreshAccessToken = async () => {
  const access_token = getAccessToken();
  const refresh_token = getRefreshToken();

  if (!refresh_token) {
    throw new Error("No refresh token available");
  }

  try {
    const response = await axios.post(
      `http://${getBaseUrl("public")}/api/refresh`,
      { refresh_token, access_token }
    );
    const { access_token: newAccessToken, refresh_token: newRefreshToken } =
      response.data;

    setTokens(newAccessToken, newRefreshToken);

    return newAccessToken;
  } catch (refreshError) {
    clearTokens();
    return Promise.reject(refreshError);
  }
};

const getBaseUrl = (apiName: string) => {
  let basePath = "localhost:3001";

  basePath += apiName === "public" ? "" : "/private";

  return basePath;
};

export const api = axios.create({});

// Request Interceptor
api.interceptors.request.use(
  async (config: any) => {
    // Check if the request URL is in the list of endpoints to skip
    const isSkippingToken = notApplyInterceptorEndpoint.some((endpoint) =>
      config.url.includes(endpoint)
    );
    // Skip adding the token for these endpoints
    if (isSkippingToken) {
      return config;
    }

    // Proceed with the token logic for all other requests
    let accessToken = getAccessToken();

    // Check if the access token is expired
    if (isTokenExpired(accessToken)) {
      try {
        // If expired, refresh the access token
        accessToken = await refreshAccessToken();
      } catch (error) {
        // Handle token refresh failure (e.g., redirect to login)

        return Promise.reject(error);
      }
    }

    // Add the Authorization header to the request
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const makeApiRequest = async (
  endpoint: string,
  method: "POST" | "GET" | "PATCH" | "DELETE" | "PUT",
  options?: {
    body?: any;
    queryParams?: any;
    apiName?: string;
  }
) => {
  const basePath =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3001"
      : "https://arthafolio-be.onrender.com";

  const service = "execute-api"; // Adjust based on your service type

  let stringifiedQueryParams = "";
  if (!R.isNil(options?.queryParams)) {
    stringifiedQueryParams = "?";
    R.forEachObjIndexed((value: any, key: any) => {
      stringifiedQueryParams += `${key}=${value}&`;
    })(options?.queryParams);
    stringifiedQueryParams = R.dropLast(1, stringifiedQueryParams);
  }

  // TODO: recuperare eventuale JWT
  const newHeaders = {
    ...(R.toUpper(method) !== "GET"
      ? { "Content-Type": "application/json", Accept: "application/json" }
      : {}),
  };

  const stringifiedBody = await JSON.stringify(options?.body ?? {});

  const opts = {
    service: service,
    path: basePath + endpoint + stringifiedQueryParams,
    method: R.toUpper(method),
    params: options?.queryParams,
    headers: newHeaders,
    ...(R.toUpper(method) !== "GET"
      ? { body: stringifiedBody ?? null, data: options?.body }
      : {}),
  } as any;

  return await api({
    url: `${basePath}${endpoint}`,
    ...(opts as any),
  });
};
