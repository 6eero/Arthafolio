"use client";

import { AIContext, useAIContext } from "@/Context/AI";
import { useAIActions } from "@/api/AI/tasks";
import { ResourceLoader } from "@/components/layout/ResourceLoader";
import * as R from "ramda";
import React from "react";
import ReactMarkdown from "react-markdown";

const AI = () => {
  const { onLoad } = useAIActions();
  const context = useAIContext();

  const message = R.propOr("", "currentMessage", context) as string;

  return (
    <ResourceLoader onLoad={onLoad} context={AIContext} noWhoAmI>
      <div className="m-6 sm:m-10 prose prose-lg max-w-none dark:prose-invert">
        <ReactMarkdown>{message}</ReactMarkdown>
      </div>
    </ResourceLoader>
  );
};

export default AI;
