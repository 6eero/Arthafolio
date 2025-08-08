"use client";

import { AIContext, useAIContext } from "@/Context/AI";
import { useAIActions } from "@/api/AI/tasks";
import { ResourceLoader } from "@/components/layout/ResourceLoader";
import * as R from "ramda";
import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

const TYPING_SPEED = 10;

const AI = () => {
  const { onLoad } = useAIActions();
  const context = useAIContext();

  const message = R.propOr("", "currentMessage", context) as string;

  const [displayedMessage, setDisplayedMessage] = useState("");
  const currentIndex = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (message !== displayedMessage) {
      if (intervalRef.current) clearInterval(intervalRef.current);

      intervalRef.current = setInterval(() => {
        if (currentIndex.current < message.length) {
          setDisplayedMessage((prev) => prev + message[currentIndex.current]);
          currentIndex.current += 1;
        } else {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
        }
      }, TYPING_SPEED);
    }
  }, [message]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <ResourceLoader onLoad={onLoad} context={AIContext} noWhoAmI>
      <div className="m-6 sm:m-10 prose prose-lg max-w-none dark:prose-invert">
        <ReactMarkdown>{displayedMessage}</ReactMarkdown>
      </div>
    </ResourceLoader>
  );
};

export default AI;
