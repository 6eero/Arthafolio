"use client";

import { Toaster } from "sonner";
import { useTheme } from "next-themes";

export default function ClientToaster() {
  const { resolvedTheme } = useTheme();

  return (
    <Toaster
      position="top-center"
      theme={resolvedTheme === "dark" ? "dark" : "light"}
    />
  );
}
