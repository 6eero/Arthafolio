"use client";
import { createContext, useContext } from "react";
import { useReducer } from "react";
import reducer from "@/Modules/Dashboard/reducer";

const initState = {
  search: {
    loading: true,
    error: false,
    errorModal: false,
    data: [],
  },
} as Context;

export const DashboardDispatchContext = createContext(null);
export const DashboardSearchContext = createContext(null);

export const useDashboardDispatchContext = () =>
  useContext(DashboardDispatchContext);
export const useDashboardSearchContext = () =>
  useContext(DashboardSearchContext);

export const DashboardContextProvider = ({ children }: BaseProvider) => {
  const [state, dispatch] = useReducer(reducer, {
    ...initState,
    search: {
      ...initState.search,
      data: [],
    },
  });

  return (
    <DashboardSearchContext.Provider value={{ ...state.search }}>
      <DashboardDispatchContext.Provider value={dispatch as any}>
        {children}
      </DashboardDispatchContext.Provider>
    </DashboardSearchContext.Provider>
  );
};
