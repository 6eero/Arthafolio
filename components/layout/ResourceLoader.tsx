"use client";

import * as R from "ramda";
import React, { useContext, useEffect } from "react";
import Loading from "./Loading";

// import ErrorResult from "../Error/ErrorResult";
// import ErrorModal from "../Error/ErrorModal";

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
    console.log("before load");
    if (!R.isNil(onLoad)) onLoad();
    console.log("after load");
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>ERRORE</p>;
    // <ErrorResult error={error} onRetry={() => {}} />;
  }

  return (
    <>
      {children}
      {/* <ErrorModal onCleanError={() => {}} error={errorModal} /> */}
    </>
  );
};
