import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import withPWA from "next-pwa";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  // tue opzioni Next.js
};

const pwaConfig = {
  dest: "public",
  runtimeCaching: require("next-pwa/cache"),
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
};

// qui cast esplicito a "any" per aggirare il problema di tipi
export default withNextIntl((withPWA(pwaConfig) as any)(nextConfig));
