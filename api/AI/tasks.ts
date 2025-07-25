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
    onGetPortfolioValutation: async () => {
      let fullText = "";

      await APIAI.getPortfolioValutation((chunk) => {
        fullText += chunk;
        console.log("➡️ fullText:", fullText);
      });

      dispatch(actions.sendToDeepseekSuccess({ fullText }));

      console.log("✅ Messaggio AI completo:", fullText);
    },
  };
};
