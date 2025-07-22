"use client";
import { Dispatch, createContext, useContext, useReducer } from "react";
import reducer from "@/Modules/AI/reducer";
import { BaseProvider, AIAction, AIState } from "./Contexts";

const initState: AIState = {
  loading: true,
  error: false,
  errorModal: false,
  data: [],
};

export const AIDispatchContext = createContext<Dispatch<AIAction> | null>(null);
export const AISearchContext = createContext<AIState["search"] | null>(null);

export const useAISearchContext = () => useContext(AISearchContext);

export const useAIDispatchContext = () => {
  const context = useContext(AIDispatchContext);
  if (!context) {
    throw new Error(
      "useAIDispatchContext must be used within AIContextProvider"
    );
  }
  return context;
};

export const AIContextProvider = ({ children }: BaseProvider) => {
  const [state, dispatch] = useReducer(reducer, {
    ...initState,
    search: {
      ...initState.search,
      data: [],
    },
  });

  return (
    <AISearchContext.Provider value={{ ...state.search }}>
      <AIDispatchContext.Provider value={dispatch}>
        {children}
      </AIDispatchContext.Provider>
    </AISearchContext.Provider>
  );
};
