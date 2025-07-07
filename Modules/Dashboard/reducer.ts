import actions from "./actions";
import { produce } from "immer";

const reducer = produce(
  (state: any, action: { type: string; payload?: any }) => {
    switch (action.type) {
      case actions.search.ROUTE: {
        return;
      }

      case actions.search.LOAD:
      case actions.search.ADD_HOLDING:
      case actions.search.EDIT_HOLDING:
      case actions.search.REMOVE_HOLDING: {
        state.search.loading = true;
        state.search.error = false;
        state.search.errorModal = false;

        return;
      }
      case actions.search.LOAD_SUCCESS:
      case actions.search.ADD_HOLDING_SUCCESS:
      case actions.search.EDIT_HOLDING_SUCCESS:
      case actions.search.REMOVE_HOLDING_SUCCESS: {
        const { data } = action.payload;
        state.search.loading = false;
        state.search.data = data;
        state.search.error = false;
        state.search.errorModal = false;

        return;
      }
      case actions.search.LOAD_FAIL:
      case actions.search.ADD_HOLDING_FAIL:
      case actions.search.EDIT_HOLDING_FAIL:
      case actions.search.REMOVE_HOLDING_FAIL: {
        const { error } = action.payload;
        state.search.loading = false;
        state.search.error = error;
        state.search.errorModal = false;

        return;
      }

      default: {
        console.log("Unknown action:", { action, actions });
      }
    }
  }
);

export default reducer;
