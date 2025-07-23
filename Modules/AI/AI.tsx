"use client";

import { AIContext, useAIContext } from "@/Context/AI";
import { useAIActions } from "@/api/AI/tasks";
import Header from "@/components/layout/Header";
import { ResourceLoader } from "@/components/layout/ResourceLoader";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import * as R from "ramda";
import React from "react";
import ReactMarkdown from "react-markdown";

const AI = () => {
  //const { data } = useAIContext();
  const { onLoad, onSendToDeepSeek } = useAIActions();
  const context = useAIContext();
  const t = useTranslations("");

  console.log("context", context);

  const rawMessage = R.pathOr("", ["data", "choices", 0, "message", "content"])(
    context
  );
  const message = rawMessage;

  console.log({ context, message });

  const handleClick = () => {
    onSendToDeepSeek({ message: "aaaaaa" });
  };

  return (
    <ResourceLoader onLoad={onLoad} context={AIContext}>
      <Header title={t("ai.title")} />
      <div className="m-4">
        <Button onClick={handleClick}>
          Ottieni valutazione sul portafolgio
        </Button>
        <div className="prose prose-lg max-w-none mt-4 dark:prose-invert">
          <ReactMarkdown>{message}</ReactMarkdown>
        </div>
      </div>
    </ResourceLoader>
  );
};

export default AI;
