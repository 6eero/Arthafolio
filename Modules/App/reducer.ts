import actions from "./actions";
import { produce } from "immer";

const reducer = produce(
  (state: any, action: { type: string; payload?: any }) => {
    switch (action.type) {
      case actions.LOGIN: {
        console.log("base action");
        state.loading = true;
        state.error = false;
        state.data = {};
        return;
      }
      case actions.LOGIN_SUCCESS: {
        console.log("success action");
        const { data } = action.payload;
        state.loading = false;
        state.data = data;
        state.error = false;
        return;
      }
      case actions.LOGIN_FAIL: {
        console.log("fail action");
        const { error } = action.payload;
        state.loading = false;
        state.error = error;
        return;
      }
    }
  }
);

export default reducer;
