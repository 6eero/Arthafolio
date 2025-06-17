import actions from "./actions";
import { produce } from "immer";

const reducer = produce(
  (state: any, action: { type: string; payload?: any }) => {
    switch (action.type) {
      case actions.APP_LOAD: {
        state.loading = true;
        state.error = false;
        return;
      }
      case actions.APP_LOAD_SUCCESS: {
        const { data } = action.payload;
        state.loading = false;
        state.data = data;
        return;
      }
      case actions.APP_LOAD_FAIL: {
        const { error } = action.payload;
        state.loading = false;
        state.error = error;
        return;
      }

      case actions.LOGIN: {
        state.button_loading = true;
        state.errorModal = false;
        state.data = {};
        return;
      }
      case actions.LOGIN_SUCCESS: {
        const { data } = action.payload;
        state.button_loading = false;
        state.data = data;
        state.errorModal = false;
        return;
      }
      case actions.LOGIN_FAIL: {
        const { error } = action.payload;
        state.button_loading = false;
        state.errorModal = error;
        return;
      }

      case actions.LOGOUT: {
        state.loading = true;
        state.errorModal = false;
        return;
      }
      case actions.LOGOUT_SUCCESS: {
        state.loading = false;
        state.errorModal = false;
        // state.data = {}
        return;
      }
      case actions.LOGOUT_FAIL: {
        const { error } = action.payload;
        state.loading = false;
        state.errorModal = error;
        return;
      }

      case actions.RESET_PASSWORD: {
        state.button_loading = true;
        state.mail_sent = false;
        state.errorModal = false;
        return;
      }
      case actions.RESET_PASSWORD_SUCCESS: {
        state.button_loading = false;
        state.mail_sent = true;
        state.errorModal = false;
        return;
      }
      case actions.RESET_PASSWORD_FAIL: {
        const { error } = action.payload;
        state.button_loading = false;
        state.errorModal = error;
        state.mail_sent = false;
        return;
      }

      case actions.CREATE_NEW_PASSWORD: {
        state.button_loading = true;
        state.errorModal = false;
        return;
      }
      case actions.CREATE_NEW_PASSWORD_SUCCESS: {
        const { user } = action.payload;
        state.button_loading = false;
        state.data = user;
        state.errorModal = false;
        return;
      }
      case actions.CREATE_NEW_PASSWORD_FAIL: {
        const { error } = action.payload;
        state.button_loading = false;
        state.errorModal = error;
        return;
      }
    }
  }
);

export default reducer;
