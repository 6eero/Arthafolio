"use client";

import { AIContext, useAIContext } from "@/Context/AI";
import { useAISearchActions } from "@/api/AI/tasks";
import { ResourceLoader } from "@/components/layout/ResourceLoader";

const AI = () => {
  const { loading } = useAIContext();
  const { onLoad } = useAISearchActions();

  return (
    <ResourceLoader onLoad={onLoad} context={AIContext}>
      {loading}
    </ResourceLoader>
  );
};

export default AI;
