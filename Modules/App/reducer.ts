import actions from "./actions";
import { produce } from "immer";

const reducer = produce(
  (state: any, action: { type: string; payload?: any }) => {
    switch (action.type) {
      // BASE
      case actions.LOGIN:
      case actions.WHO_AM_I:
      case actions.LOGOUT: {
        state.loading = true;
        state.error = false;
        state.data = {};
        return;
      }

      case actions.UPDATE_PREFERENCES: {
        state.loading = true;
        state.error = false;
        return;
      }

      // SUCCESS
      case actions.LOGIN_SUCCESS:
      case actions.WHO_AM_I_SUCCESS:
      case actions.LOGOUT_SUCCESS:
      case actions.UPDATE_PREFERENCES_SUCCESS: {
        const { data } = action.payload;
        state.loading = false;
        state.data = data;
        state.error = false;
        return;
      }

      // FAIL
      case actions.LOGIN_FAIL:
      case actions.WHO_AM_I_FAIL:
      case actions.LOGOUT_FAIL:
      case actions.UPDATE_PREFERENCES_FAIL: {
        const { error } = action.payload;
        state.loading = false;
        state.error = error;
        return;
      }
    }
  }
);

export default reducer;
