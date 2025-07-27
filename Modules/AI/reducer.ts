import actions from "./actions";
import { produce } from "immer";

const reducer = produce(
  (state: any, action: { type: string; payload?: any }) => {
    switch (action.type) {
      case actions.LOAD:
      case actions.GET_PORTFOLIO_VALUATION: {
        state.loading = true;
        state.error = false;
        break;
      }
      case actions.LOAD_SUCCESS: {
        const { data } = action.payload;
        state.loading = false;
        state.error = false;
        state.data = data;
        break;
      }
      case actions.LOAD_FAIL:
      case actions.GET_PORTFOLIO_VALUATION_FAIL: {
        const { error } = action.payload;
        state.loading = false;
        state.error = error;
        break;
      }

      case actions.GET_PORTFOLIO_VALUATION_UPDATE: {
        state.loading = false;
        state.currentMessage += action.payload.fullText;
        break;
      }

      case actions.GET_PORTFOLIO_VALUATION_SUCCESS: {
        const { fullText } = action.payload;
        state.loading = false;
        state.error = false;
        if (fullText !== undefined) {
          state.currentMessage = fullText; // Override of the partial text with the full one
        }
      }

      default: {
        console.error("Unknown action:", { action, actions });
      }
    }
  }
);

export default reducer;
