"use client";
import {
  LayoutDashboard,
  CircleDollarSign,
  Settings2,
  LucideIcon,
  ChevronUp,
  User2,
  LogOut,
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

// Menu items.
const items = [
  { titleKey: "dashboard", url: "/dashboard", icon: LayoutDashboard },
  {
    titleKey: "cryptocurrency",
    url: "/cryptocurrency",
    icon: CircleDollarSign,
  },
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

  const user = R.pathOr("Arthafolio user", ["data", "email"], context);

  return (
    <Sidebar variant={variant}>
      <SidebarHeader>
        <div className="flex gap-2 items-center mb-5">
          <Logo className="w-8 h-8" />
          <p className="text-2xl font-bold ">Arthafolio</p>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {R.map((item: MenuVoice) => (
                <SidebarMenuItem key={item.titleKey}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{t(item.titleKey)}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))(items)}
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
                  <User2 /> {user}
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
