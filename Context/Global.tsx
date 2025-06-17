"use client";
import reducer from "@/Modules/App/reducer";
import { Dispatch, createContext, useContext } from "react";
import { useReducer } from "react";

const initState: GlobalState = {
  loading: false,
  data: [],
  error: false,
  errorModal: false,
};

export const GlobalContext = createContext(null);
export const GlobalDispatchContext =
  createContext<Dispatch<DashboardAction> | null>(null);

export const useGlobalContext = () => useContext(GlobalContext);
export const useGlobalDispatchContext = () => {
  const context = useContext(GlobalDispatchContext);
  if (!context) {
    throw new Error(
      "useGlobalDispatchContext must be used within GlobalContextProvider"
    );
  }
  return context;
};

export const GlobalContextProvider = ({ children }: BaseProvider) => {
  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <GlobalContext.Provider
      value={{
        ...state,
      }}
    >
      <GlobalDispatchContext.Provider value={dispatch}>
        {children}
      </GlobalDispatchContext.Provider>
    </GlobalContext.Provider>
  );
};
