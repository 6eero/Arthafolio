import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { DashboardContextProvider } from "@/Context/Dashboard";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/ui/app-sidebar";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Arthafolio",
  description: "Track your assets",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  return (
    <>
      <html lang={locale} suppressHydrationWarning>
        <head />
        <body suppressHydrationWarning>
          <DashboardContextProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <NextIntlClientProvider>
                <SidebarProvider>
                  <AppSidebar variant="inset" />
                  <main className="w-full min-h-screen p-5">
                    <div className="w-full h-full bg-background rounded-3xl">
                      {children}
                    </div>
                  </main>
                </SidebarProvider>
              </NextIntlClientProvider>
            </ThemeProvider>
          </DashboardContextProvider>
        </body>
      </html>
    </>
  );
}
