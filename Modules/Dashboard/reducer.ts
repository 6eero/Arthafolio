import actions from "./actions";
import { produce } from "immer";

const reducer = produce(
  (state: any, action: { type: string; payload?: any }) => {
    switch (action.type) {
      case actions.ROUTE: {
        return;
      }

      case actions.LOAD:
      case actions.ADD_HOLDING:
      case actions.EDIT_HOLDING:
      case actions.REMOVE_HOLDING: {
        state.loading = true;
        state.error = false;
        state.timeframe = "D";
        return;
      }

      case actions.CHANGE_TIMEFRAME: {
        state.loading = false;
        state.componentLoading = true;
        state.error = false;
        state.timeframe = action.payload?.timeframe ?? "D";
        return;
      }

      case actions.LOAD_SUCCESS:
      case actions.ADD_HOLDING_SUCCESS:
      case actions.EDIT_HOLDING_SUCCESS:
      case actions.REMOVE_HOLDING_SUCCESS:
      case actions.CHANGE_TIMEFRAME_SUCCESS: {
        const { data } = action.payload;
        state.loading = false;
        state.componentLoading = false;
        state.data = data;
        state.error = false;
        return;
      }

      case actions.LOAD_FAIL:
      case actions.ADD_HOLDING_FAIL:
      case actions.EDIT_HOLDING_FAIL:
      case actions.REMOVE_HOLDING_FAIL:
      case actions.CHANGE_TIMEFRAME_FAIL: {
        const { error } = action.payload;
        state.loading = false;
        state.componentLoading = false;
        state.error = error;
        return;
      }

      default: {
        console.error("Unknown action:", { action, actions });
      }
    }
  }
);

export default reducer;
