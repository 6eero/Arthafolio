import actions from "./actions";
import { produce } from "immer";

const reducer = produce(
  (state: any, action: { type: string; payload?: any }) => {
    switch (action.type) {
      case actions.LOAD: {
        console.log("reducer base");
        state.loading = true;
        state.error = false;
        break;
      }
      case actions.LOAD_SUCCESS: {
        console.log("reducer success");
        const { data } = action.payload;
        state.loading = false;
        state.error = false;
        state.data = data;
        break;
      }
      case actions.LOAD_FAIL: {
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
