import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { DashboardContextProvider } from "@/Context/Dashboard";
import NavBar from "@/components/layout/NavBar";
import { Toaster } from "sonner";

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
              <NavBar />
              <div className="w-screen h-screen p-10">{children}</div>
              <Toaster richColors theme="system" />
            </ThemeProvider>
          </DashboardContextProvider>
        </body>
      </html>
    </>
  );
}
