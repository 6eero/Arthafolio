import Cookies from "js-cookie";

const accessTokenExpiresDays = 7; // Durata cookie access token (giorni)
const refreshTokenExpiresDays = 30; // Durata cookie refresh token (giorni)

export const getAccessToken = () =>
  Cookies.get("access_token") || localStorage.getItem("access_token");

export const getRefreshToken = () =>
  Cookies.get("refresh_token") || localStorage.getItem("refresh_token");

export const setTokens = (newAccessToken: string, newRefreshToken: string) => {
  // Salvo cookie con durata esplicita per persistenza
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

  // Salvo anche in localStorage (opzionale, utile per client-only)
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
