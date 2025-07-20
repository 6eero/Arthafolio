import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import { GlobalContextProvider } from "@/Context/Global";
import ClientToaster from "@/components/messages/ClientToaster";

export const metadata: Metadata = {
  title: "Arthafolio",
  description: "Track your assets",
  manifest: "/manifest.json",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body suppressHydrationWarning>
        <GlobalContextProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NextIntlClientProvider>
              {children}
              <ClientToaster />
            </NextIntlClientProvider>
          </ThemeProvider>
        </GlobalContextProvider>
      </body>
    </html>
  );
}
