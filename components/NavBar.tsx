"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ThemeSwitcher from "./ThemeSwitcher";

const NavBar = () => {
  const router = useRouter();
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        padding: "20px 40px",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <p style={{ fontSize: 24, fontWeight: 800 }}>Arthafolio</p>
      <div style={{ display: "flex", alignItems: "center", gap: "40px" }}>
        <p
          onClick={() => router.push("/dashboard")}
          style={{ cursor: "pointer" }}
        >
          Dashboard
        </p>
        <p
          onClick={() => router.push("/settings")}
          style={{ cursor: "pointer" }}
        >
          Settings
        </p>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src="https://avatars.githubusercontent.com/u/114809573?v=4" />
              <AvatarFallback>AG</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <ThemeSwitcher />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default NavBar;
