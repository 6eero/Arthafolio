import * as R from "ramda";
import { api } from "./makeApiRequest";

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
