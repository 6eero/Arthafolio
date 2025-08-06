import { DashboardContextProvider } from "@/Context/Dashboard";
import { AIContextProvider } from "@/Context/AI";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/ui/app-sidebar";

const AuthorizedLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <DashboardContextProvider>
      <AIContextProvider>
        <SidebarProvider>
          <AppSidebar variant="inset" />
          <main className="w-full min-h-screen p-5">
            <div className="w-full h-full bg-background rounded-3xl">
              {children}
            </div>
          </main>
        </SidebarProvider>
      </AIContextProvider>
    </DashboardContextProvider>
  );
};

export default AuthorizedLayout;
