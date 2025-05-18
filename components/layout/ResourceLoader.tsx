"use client";

import * as R from "ramda";
import React, { useContext, useEffect } from "react";
// import ErrorResult from "../Error/ErrorResult";
// import ErrorModal from "../Error/ErrorModal";

export const ResourceLoader = ({
  onLoad,
  children,
  context: Context,
}: {
  onLoad?: any;
  children: any;
  context: any;
}) => {
  const state: any = useContext(Context);
  const { loading = false, error = false, errorModal = false } = state;

  useEffect(() => {
    if (!R.isNil(onLoad)) onLoad();
  }, []);

  if (loading) {
    return <p>LOADING</p>;
  }

  if (error) {
    return <p>ERRORE</p>;
    // <ErrorResult error={error} onRetry={() => {}} />;
  }

  return (
    <>
      {children}
      <p>ERRORE</p>
      {/* <ErrorModal onCleanError={() => {}} error={errorModal} /> */}
    </>
  );
};
