import { useAIContext, useAIDispatchContext } from "@/Context/AI";
import * as APIAI from "./endpoints";
import actions from "@/Modules/AI/actions";

export const useAIActions = () => {
  const dispatch = useAIDispatchContext();
  const context = useAIContext();

  return {
    onLoad: async () => {
      console.log("onLoad");
      const hasData =
        context.reasoning?.length > 0 || context.currentMessage?.length > 0;

      if (hasData) return;

      dispatch(actions.sendToDeepseek({}));

      try {
        const data = await APIAI.getPortfolioValutation(
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
          },
          () => {
            dispatch(actions.sendToDeepseekFail({ error: true }));
          }
        );
        dispatch(actions.sendToDeepseekSuccess({ data }));
      } catch (error) {
        dispatch(actions.sendToDeepseekFail({ error: error }));
      }
    },
  };
};
