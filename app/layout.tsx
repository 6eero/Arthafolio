import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
//import NavBar from "@/components/layout/NavBar";
import PageContentLayout from "@/components/layout/PageContentLayout";
import { DashboardContextProvider } from "@/Context/Dashboard";

export const metadata: Metadata = {
  title: "Arthafolio",
  description: "Track your assets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body suppressHydrationWarning>
          <DashboardContextProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {/* <NavBar /> */}
              <PageContentLayout>{children}</PageContentLayout>
            </ThemeProvider>
          </DashboardContextProvider>
        </body>
      </html>
    </>
  );
}
