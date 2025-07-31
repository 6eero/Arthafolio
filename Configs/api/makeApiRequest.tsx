import axios from "axios";
import * as R from "ramda";
import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  isTokenExpired,
  setTokens,
} from "@/Utils/tokens";
import { publicUrls } from "@/Models/App/constants";

const notApplyInterceptorEndpoint = publicUrls;

const API_BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3001"
    : "https://arthafolio-be.onrender.com";

const refreshAccessToken = async () => {
  const access_token = getAccessToken();
  const refresh_token = getRefreshToken();

  if (!refresh_token) {
    throw new Error("No refresh token available");
  }

  try {
    const response = await axios.post(`${API_BASE_URL}/api/refresh`, {
      refresh_token,
      access_token,
    });
    const { access_token: newAccessToken, refresh_token: newRefreshToken } =
      response.data;

    setTokens(newAccessToken, newRefreshToken);

    return newAccessToken;
  } catch (refreshError) {
    clearTokens();
    return Promise.reject(refreshError);
  }
};

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

export const api = axios.create({});

api.interceptors.request.use(
  async (config: any) => {
    const isSkippingToken = notApplyInterceptorEndpoint.some((endpoint) =>
      config.url.includes(endpoint)
    );
    if (isSkippingToken) {
      return config;
    }

    const accessToken = getAccessToken();

    if (isTokenExpired(accessToken)) {
      if (isRefreshing) {
        // Se un refresh è già in corso, metti in coda la richiesta
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            config.headers["Authorization"] = "Bearer " + token;
            return config;
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      isRefreshing = true;

      try {
        const newAccessToken = await refreshAccessToken();
        config.headers["Authorization"] = `Bearer ${newAccessToken}`;
        processQueue(null, newAccessToken); // Processa la coda con successo
        return config;
      } catch (error) {
        processQueue(error, null); // Processa la coda con errore
        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }

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
    path: API_BASE_URL + endpoint + stringifiedQueryParams,
    method: R.toUpper(method),
    params: options?.queryParams,
    headers: newHeaders,
    ...(R.toUpper(method) !== "GET"
      ? { body: stringifiedBody ?? null, data: options?.body }
      : {}),
  } as any;

  return await api({
    url: `${API_BASE_URL}${endpoint}`,
    ...(opts as any),
  });
};
