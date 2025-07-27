import { useAIContext, useAIDispatchContext } from "@/Context/AI";
import * as APIAI from "./endpoints";
import actions from "@/Modules/AI/actions";

export const useAIActions = () => {
  const dispatch = useAIDispatchContext();
  const context = useAIContext();

  return {
    onLoad: async () => {
      console.log("onLoad");
      const hasData = context.currentMessage?.length > 0;

      if (hasData) return;

      dispatch(actions.getPortfolioValuation({}));

      try {
        await APIAI.getPortfolioValuation(
          (textChunk: string) => {
            dispatch(
              actions.getPortfolioValuationUpdate({ fullText: textChunk })
            );
          },
          (fullMessage: string) => {
            dispatch(
              actions.getPortfolioValuationSuccess({ fullText: fullMessage })
            );
          },
          () => {
            dispatch(actions.getPortfolioValuationFail({ error: true }));
          }
        );
      } catch (error) {
        dispatch(actions.getPortfolioValuationFail({ error: error }));
      }
    },
  };
};
