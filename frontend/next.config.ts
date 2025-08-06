import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import withPWA from "next-pwa";
import packageJson from "./package.json";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_APP_VERSION: packageJson.version,
  },
};

const pwaConfig = {
  dest: "public",
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  runtimeCaching: require("next-pwa/cache"),
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
};

// qui cast esplicito a "any" per aggirare il problema di tipi
export default withNextIntl((withPWA(pwaConfig) as any)(nextConfig));
