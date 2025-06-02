"use client";

import * as R from "ramda";
import React, { useContext, useEffect } from "react";
import Loading from "./Loading";
import { ErrorBlock } from "../error/ErrorBlock";

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
  const state: any = useContext(Context);
  const { loading = false, error = false } = state;

  useEffect(() => {
    if (!R.isNil(onLoad)) onLoad();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorBlock error={error} />;
  }

  return children;
};
