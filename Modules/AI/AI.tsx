"use client";

import { AIContext } from "@/Context/AI";
import { useAIActions } from "@/api/AI/tasks";
import Header from "@/components/layout/Header";
import { ResourceLoader } from "@/components/layout/ResourceLoader";
import { useTranslations } from "next-intl";

const AI = () => {
  //const { data } = useAIContext();
  const { onLoad } = useAIActions();
  const t = useTranslations("");

  return (
    <ResourceLoader onLoad={onLoad} context={AIContext}>
      <Header title={t("ai.title")} />
      <div className="m-4">
        <p>aaaaaaaa</p>
      </div>
    </ResourceLoader>
  );
};

export default AI;
