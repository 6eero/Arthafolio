import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "../ui/sidebar";
import { LogOut, UserRound } from "lucide-react";
import * as R from "ramda";
import { useGlobalContext } from "@/Context/Global";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslations } from "next-intl";
import Button from "../custom/Button";
import { useAppActions } from "@/api/App/tasks";
import { useRouter } from "next/navigation";

const Header = ({ title }: { title: string }) => {
  const context = useGlobalContext();
  const t = useTranslations("sidebar");
  const { onLogout } = useAppActions();
  const router = useRouter();

  const user = R.pathOr("Arthafolio user", ["data", "username"], context);

  return (
    <>
      <div className="flex items-center gap-3 p-2">
        <SidebarTrigger />
        <Separator orientation="vertical" className="!h-6 hidden sm:block" />
        <div className="w-full flex justify-between items-center">
          <p className="text-md font-semibold">{title}</p>

          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <UserRound size={20} />
              </DropdownMenuTrigger>
              <DropdownMenuContent alignOffset={-200}>
                <DropdownMenuLabel>{user}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push("/settings")}>
                  {t("settings")}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogout}>
                  <LogOut className="text-destructive" />
                  {t("logout")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <Separator />
    </>
  );
};

export default Header;
