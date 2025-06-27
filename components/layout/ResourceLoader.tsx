"use client";

import * as R from "ramda";
import React, { useContext, useEffect } from "react";
import Loading from "./Loading";
import { ErrorBlock } from "../error/ErrorBlock";
import { useAppActions } from "@/api/App/tasks";

type ResourceLoaderProps = {
  onLoad?: () => void | Promise<void>;
  children: React.ReactNode;
  context: React.Context<any>;
};

export const ResourceLoader = ({
  onLoad,
  children,
  context: Context,
}: ResourceLoaderProps) => {
  const state = useContext(Context);
  const { onWhoAmI } = useAppActions();
  const { loading = false, error = false } = state;

  useEffect(() => {
    if (!R.isNil(onLoad)) {
      onWhoAmI();
      onLoad();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorBlock error={error} />;
  }

  return children;
};
