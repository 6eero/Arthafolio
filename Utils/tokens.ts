import Cookies from "js-cookie";

const accessTokenExpiresDays = 7; // 7 giorni
const refreshTokenExpiresDays = 30; // 30 giorni

export const getAccessToken = () => Cookies.get("access_token");

export const getRefreshToken = () => Cookies.get("refresh_token");

export const setTokens = (newAccessToken: string, newRefreshToken: string) => {
  Cookies.set("access_token", newAccessToken, {
    expires: accessTokenExpiresDays,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
  Cookies.set("refresh_token", newRefreshToken, {
    expires: refreshTokenExpiresDays,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
};

export const clearTokens = () => {
  Cookies.remove("access_token");
  Cookies.remove("refresh_token");
  window.location.href = "/login";
};
