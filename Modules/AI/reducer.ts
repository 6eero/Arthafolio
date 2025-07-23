import actions from "./actions";
import { produce } from "immer";

const reducer = produce(
  (state: any, action: { type: string; payload?: any }) => {
    switch (action.type) {
      case actions.LOAD:
      case actions.SEND_TO_DEEPSEEK: {
        state.loading = true;
        state.error = false;
        break;
      }
      case actions.LOAD_SUCCESS:
      case actions.SEND_TO_DEEPSEEK_SUCCESS: {
        const { data } = action.payload;
        state.loading = false;
        state.error = false;
        state.data = data;
        break;
      }
      case actions.LOAD_FAIL:
      case actions.SEND_TO_DEEPSEEK_FAIL: {
        const { error } = action.payload;
        state.loading = false;
        state.error = error;
        break;
      }

      default: {
        console.error("Unknown action:", { action, actions });
      }
    }
  }
);

export default reducer;
