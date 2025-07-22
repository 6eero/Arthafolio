import { useAIDispatchContext } from "@/Context/AI";
import * as APIAI from "./endpoints";
import actions from "@/Modules/AI/actions";

export const useAISearchActions = () => {
  const dispatch = useAIDispatchContext();

  return {
    // Triggered when the /ai page loads
    onLoad: async () => {
      dispatch(actions.load({}));
      try {
        dispatch(actions.loadSuccess({}));
      } catch (error) {
        dispatch(actions.loadFail({ error }));
      }
    },
  };
};
