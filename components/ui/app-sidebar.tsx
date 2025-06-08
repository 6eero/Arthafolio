import {
  LayoutDashboard,
  CircleDollarSign,
  Settings2,
  LucideIcon,
  ChevronUp,
  User2,
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
                  <User2 /> Arthafolio user
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Sign out</span>
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
