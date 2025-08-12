"use client";
import { Dispatch, createContext, useContext, useReducer } from "react";
import reducer from "@/Modules/Dashboard/reducer";
import { BaseProvider, DashboardAction, DashboardState } from "./Contexts";

const initState: DashboardState = {
  loading: true,
  error: false,
  data: [],
  timeframe: "7d",
  loadingDrower: false,
  priceHistoryData: [],
};

export const DashboardDispatchContext =
  createContext<Dispatch<DashboardAction> | null>(null);
export const DashboardContext = createContext<DashboardState | null>(null);

export const useDashboardContext = () => useContext(DashboardContext);

export const useDashboardDispatchContext = () => {
  const context = useContext(DashboardDispatchContext);
  if (!context) {
    throw new Error(
      "useDashboardDispatchContext must be used within DashboardContextProvider"
    );
  }
  return context;
};

export const DashboardContextProvider = ({ children }: BaseProvider) => {
  const [state, dispatch] = useReducer(reducer, {
    ...initState,
    data: [],
  });

  return (
    <DashboardContext.Provider value={{ ...state }}>
      <DashboardDispatchContext.Provider value={dispatch}>
        {children}
      </DashboardDispatchContext.Provider>
    </DashboardContext.Provider>
  );
};
