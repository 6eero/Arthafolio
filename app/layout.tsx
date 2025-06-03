import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { DashboardContextProvider } from "@/Context/Dashboard";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/Sidebar/Sidebar";
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
              {/* <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                  <header className="flex h-16 shrink-0 items-center gap-2">
                    <div className="flex items-center gap-2 px-4">
                      <SidebarTrigger className="-ml-1" />
                      <p className="font-semibold text-normal">Dashboard</p>
                    </div>
                  </header> */}
              <NavBar />
              <div className="w-screen h-screen p-10">{children}</div>
              <Toaster richColors theme="system" />
              {/* </SidebarInset>
              </SidebarProvider> */}
            </ThemeProvider>
          </DashboardContextProvider>
        </body>
      </html>
    </>
  );
}
