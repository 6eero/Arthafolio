import Cookies from "js-cookie";

export const getAccessToken = () =>
  Cookies.get("access_token") || localStorage.getItem("access_token");

export const getRefreshToken = () =>
  Cookies.get("refresh_token") || localStorage.getItem("refresh_token");

export const setTokens = (newAccessToken: string, newRefreshToken: string) => {
  Cookies.set("access_token", newAccessToken);
  Cookies.set("refresh_token", newRefreshToken);
  localStorage.setItem("access_token", newAccessToken);
  localStorage.setItem("refresh_token", newRefreshToken);
};

export const clearTokens = () => {
  Cookies.remove("access_token");
  Cookies.remove("refresh_token");
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  window.location.href = "/login";
};
