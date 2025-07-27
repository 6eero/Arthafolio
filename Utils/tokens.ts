import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const refreshTokenExpiresDays = 30;

export const getAccessToken = () => Cookies.get("access_token");
export const getRefreshToken = () => Cookies.get("refresh_token");

export const setTokens = (newAccessToken: string, newRefreshToken: string) => {
  const cookieOptions: {
    expires: number;
    secure: boolean;
    sameSite: "lax" | "strict" | "Strict" | "Lax" | "none" | "None" | undefined;
  } = {
    expires: refreshTokenExpiresDays,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  };

  Cookies.set("access_token", newAccessToken, cookieOptions);
  Cookies.set("refresh_token", newRefreshToken, cookieOptions);
};

export const clearTokens = () => {
  Cookies.remove("access_token");
  Cookies.remove("refresh_token");
  window.location.href = "/login";
};

export const isTokenExpired = (token: any) => {
  if (!token) return true;

  const decodedToken: any = jwtDecode(token);
  const currentTime = Date.now() / 1000; // Get current time in seconds

  return decodedToken.exp < currentTime;
};
