import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import PageContentLayout from "@/components/layout/PageContentLayout";
import { DashboardContextProvider } from "@/Context/Dashboard";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/Sidebar/Sidebar";
import { SiteHeader } from "@/components/layout/SiteHeader";
// import NavBar from "@/components/layout/NavBar";

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
              <SidebarProvider>
                <AppSidebar variant="inset" />
                <SidebarInset>
                  <SiteHeader />
                  <div className="p-5 h-full">{children}</div>
                </SidebarInset>
              </SidebarProvider>
            </ThemeProvider>
          </DashboardContextProvider>
        </body>
      </html>
    </>
  );
}
