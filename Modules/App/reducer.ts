import actions from "./actions";
import { produce } from "immer";

const reducer = produce(
  (state: any, action: { type: string; payload?: any }) => {
    switch (action.type) {
      case actions.LOGIN:
      case actions.WHO_AM_I: {
        state.loading = true;
        state.error = false;
        state.data = {};
        return;
      }
      case actions.LOGIN_SUCCESS:
      case actions.WHO_AM_I_SUCCESS: {
        const { data } = action.payload;
        state.loading = false;
        state.data = data;
        state.error = false;
        return;
      }
      case actions.LOGIN_FAIL:
      case actions.WHO_AM_I_FAIL: {
        const { error } = action.payload;
        state.loading = false;
        state.error = error;
        return;
      }
    }
  }
);

export default reducer;
