import actions from "./actions";
import { produce } from "immer";

const reducer = produce(
  (state: any, action: { type: string; payload?: any }) => {
    switch (action.type) {
      // BASE
      case actions.REGISTER:
      case actions.CONFIRM_EMAIL:
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

      case actions.REGISTER_SUCCESS: {
        state.emailSent = true;
        state.loading = false;
        state.error = false;
        return;
      }

      case actions.CONFIRM_EMAIL_SUCCESS: {
        state.emailConfirmed = true;
        state.loading = false;
        state.error = false;
        return;
      }

      case actions.LOGIN_SUCCESS:
      case actions.WHO_AM_I_SUCCESS:
      case actions.LOGOUT_SUCCESS:
      case actions.UPDATE_PREFERENCES_SUCCESS: {
        state.emailSent = false;
        const { data } = action.payload;
        state.loading = false;
        state.data = data;
        state.error = false;
        return;
      }

      // FAIL
      case actions.CONFIRM_EMAIL_FAIL:
      case actions.REGISTER_FAIL:
      case actions.LOGIN_FAIL:
      case actions.WHO_AM_I_FAIL:
      case actions.LOGOUT_FAIL:
      case actions.UPDATE_PREFERENCES_FAIL: {
        state.emailSent = false;
        const { error } = action.payload;
        state.loading = false;
        state.error = error;
        return;
      }
    }
  }
);

export default reducer;
