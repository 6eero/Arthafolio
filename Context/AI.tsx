"use client";
import { Dispatch, createContext, useContext, useReducer } from "react";
import reducer from "@/Modules/AI/reducer";
import { BaseProvider, AIAction, AIState } from "./Contexts";

const initState: AIState = {
  loading: false,
  error: false,
  data: [],
  currentMessage: `## Portfolio Analysis
  
**Overall Assessment**: Moderate portfolio with significant concentration risks

 ### Strengths✅
 - **Strong core holdings**: Excellent exposure to Bitcoin (27%) and Ethereum (16%) the two most established cryptocurrencies
 - **High liquidity**: All held assets are highly liquid and easily tradable on major exchanges
 - **Multi-ecosystem exposure**: Covers Ethereum (ETH), Binance (BNB), and independent chains (DOGE)

### Major Concerns⚠️
1. Extreme DOGE Concentration (54%) 
- DOGE represents over half your portfolio despite being a memecoin with limited fundamentals
- This creates massive volatility risk and speculative exposure- While DOGE has shown remarkable performance, it lacks the institutional backing and use cases of blue-chip crypto**
2. Missing Stablecoins
- No stablecoin allocation for downside protection and portfolio stability
- Lack of capital preservation mechanism during market downturns
3. Limited Diversification**
- Over-reliance on meme/retail-driven assets (DOGE dominance)
- Missing key sectors: DeFi, Layer2s, Infrastructure tokens

### Recommendations📋
1. **Reduce DOGE exposure** 
- Consider reallocating 30-40% to more fundamental assets
2. **Add stablecoins** (USDC, USDT) 
- Allocate 5-10% for stability buffer
3. **Increase BTC/ETH weighting** 
- These provide the strongest risk-adjusted returns`,
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
