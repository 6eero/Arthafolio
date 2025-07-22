"use client";
import {
  LayoutDashboard,
  Settings2,
  LucideIcon,
  ChevronUp,
  User2,
  LogOut,
  Sparkles,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import * as R from "ramda";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import Logo from "../icons/Logo";

import { useTranslations } from "next-intl";
import { useGlobalContext } from "@/Context/Global";
import { useAppActions } from "@/api/App/tasks";
import Button from "@/components/custom/Button";

import { usePathname } from "next/navigation";

// Menu items.
const items = [
  { titleKey: "dashboard", url: "/dashboard", icon: LayoutDashboard },
  { titleKey: "ai-tools", url: "/ai-tools", icon: Sparkles },
  { titleKey: "settings", url: "/settings", icon: Settings2 },
];

type MenuVoice = {
  titleKey: string;
  url: string;
  icon: LucideIcon;
};

const AppSidebar = ({
  variant = "sidebar",
}: {
  variant: "sidebar" | "floating" | "inset";
}) => {
  const t = useTranslations("sidebar");
  const context = useGlobalContext();
  const { onLogout } = useAppActions();
  const pathname = usePathname();

  const user = R.pathOr("Arthafolio user", ["data", "username"], context);

  return (
    <Sidebar variant={variant}>
      <SidebarHeader>
        <div className="flex gap-2 items-center mb-5 p-2">
          <Logo className="w-8 h-8" />
          <p className="text-2xl font-bold ">Arthafolio</p>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {R.map((item: MenuVoice) => {
                const isActive = pathname === item.url;

                return (
                  <SidebarMenuItem key={item.titleKey} className="py-1">
                    <SidebarMenuButton asChild>
                      <a
                        href={item.url}
                        className={`
            flex gap-2 rounded-lg
            text-[16px] font-semibold transition-colors
            ${
              isActive
                ? "bg-primary text-background"
                : "hover:bg-muted text-muted-foreground"
            }
          `}
                      >
                        <item.icon />
                        {t(item.titleKey)}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })(items)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 />
                  <p className="text-[16px] font-semibold">{user}</p>
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <Button icon={<LogOut />} onClick={onLogout} variant="link">
                    {t("logout")}
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
