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
      dispatch(actions.sendToDeepseek({}));

      try {
        await APIAI.getPortfolioValutation(
          (reasoningChunk) => {
            dispatch({
              type: actions.UPDATE_REASONING,
              payload: { fullText: reasoningChunk },
            });
          },
          (textChunk) => {
            dispatch({
              type: actions.UPDATE_CURRENT_MESSAGE,
              payload: { fullText: textChunk },
            });
          }
        );
      } catch (error) {
        dispatch(actions.sendToDeepseekFail({ error }));
      }
    },
  };
};
