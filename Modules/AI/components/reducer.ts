import actions from "./actions";
import { produce } from "immer";

const reducer = produce(
  (state: any, action: { type: string; payload?: any }) => {
    switch (action.type) {
      default: {
        console.error("Unknown action:", { action, actions });
      }
    }
  }
);

export default reducer;
