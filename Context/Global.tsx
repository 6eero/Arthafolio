"use client";
import reducer from "@/Modules/App/reducer";
import { Dispatch, createContext, useContext } from "react";
import { useReducer } from "react";
import { BaseProvider, DashboardAction, GlobalState } from "./Contexts";

const initState: GlobalState = {
  data: {},
  loading: false,
  error: false,
  errorModal: false,
  emailSent: false,
  emailConfirmed: false,
};

export const GlobalContext = createContext<GlobalState | null>(null);
export const GlobalDispatchContext =
  createContext<Dispatch<DashboardAction> | null>(null);

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error(
      "useGlobalContext must be used within GlobalContextProvider"
    );
  }
  return context;
};

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
