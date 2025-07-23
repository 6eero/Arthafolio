import { useAIDispatchContext } from "@/Context/AI";
import * as APIAI from "./endpoints";
import actions from "@/Modules/AI/actions";

export const useAIActions = () => {
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
    onSendToDeepSeek: async ({ message }: { message: string }) => {
      dispatch(actions.sendToDeepseek({}));
      try {
        const { data } = await APIAI.sendToDeepseek(message);
        dispatch(actions.sendToDeepseekSuccess({ data }));
      } catch (error) {
        dispatch(actions.sendToDeepseekFail({ error }));
      }
    },
  };
};
