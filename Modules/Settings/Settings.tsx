"use client";

import Header from "@/components/layout/Header";
import { ResourceLoader } from "@/components/layout/ResourceLoader";
import ThemeSwitcher from "@/components/layout/ThemeSwitcher";
import { useTranslations } from "next-intl";

const Settings = () => {
  const t = useTranslations("");

  return (
    <ResourceLoader>
      <div className="w-full flex flex-col">
        <Header title={t("settings.title")} />
        <div className="sm:m-4 mt-4 flex items-center gap-4">
          <p>Theme:</p>
          <ThemeSwitcher />
        </div>
        <div className="sm:m-4 mt-4 flex items-center gap-4">
          <p></p>
          <ThemeSwitcher />
        </div>
      </div>
    </ResourceLoader>
  );
};

export default Settings;
