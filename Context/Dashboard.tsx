"use client";
import { Dispatch, createContext, useContext, useReducer } from "react";
import reducer from "@/Modules/Dashboard/reducer";

const initState: DashboardState = {
  search: {
    loading: true,
    error: false,
    errorModal: false,
    data: [],
  },
};

export const DashboardDispatchContext =
  createContext<Dispatch<DashboardAction> | null>(null);
export const DashboardSearchContext = createContext<
  DashboardState["search"] | null
>(null);

export const useDashboardSearchContext = () =>
  useContext(DashboardSearchContext);

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
    search: {
      ...initState.search,
      data: [],
    },
  });

  return (
    <DashboardSearchContext.Provider value={{ ...state.search }}>
      <DashboardDispatchContext.Provider value={dispatch}>
        {children}
      </DashboardDispatchContext.Provider>
    </DashboardSearchContext.Provider>
  );
};
