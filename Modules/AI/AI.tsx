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
  const { onLoad, onGetPortfolioValutation } = useAIActions();
  const context = useAIContext();
  const t = useTranslations("");

  const message = R.propOr("", "currentMessage", context) as string;
  const reasoning = R.propOr("", "reasoning", context) as string;

  console.log("🔵 Reasoning and message:", { reasoning, message });

  const handleClick = () => {
    onGetPortfolioValutation();
  };

  return (
    <ResourceLoader onLoad={onLoad} context={AIContext}>
      <Header title={t("ai.title")} />
      <div className="m-4">
        <Button onClick={handleClick}>
          Ottieni valutazione sul portafolgio
        </Button>
        <div className="prose prose-lg max-w-none mt-4 dark:prose-invert">
          <ReactMarkdown>{reasoning}</ReactMarkdown>
        </div>
        <div className="prose prose-lg max-w-none mt-4 dark:prose-invert">
          <ReactMarkdown>{message}</ReactMarkdown>
        </div>
      </div>
    </ResourceLoader>
  );
};

export default AI;
