"use client";
import { Dispatch, createContext, useContext, useReducer } from "react";
import reducer from "@/Modules/AI/reducer";
import { BaseProvider, AIAction, AIState } from "./Contexts";

const initState: AIState = {
  loading: true,
  error: false,
  data: [],
  currentMessage: "",
  reasoning: "",
};

export const AIDispatchContext = createContext<Dispatch<AIAction> | null>(null);
export const AIContext = createContext<AIState | null>(null);

export const useAIContext = () => {
  const context = useContext(AIContext);
  if (!context) {
    throw new Error("useAIContext must be used within AIContextProvider");
  }
  return context;
};

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
    data: [],
  });

  return (
    <AIContext.Provider value={{ ...state }}>
      <AIDispatchContext.Provider value={dispatch}>
        {children}
      </AIDispatchContext.Provider>
    </AIContext.Provider>
  );
};
