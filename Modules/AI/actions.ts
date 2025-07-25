import {
  getAsyncActions,
  getAsyncActionsFunctions,
  getStartUpActions,
  getStartUpActionsFunctions,
} from "@/Utils/actions/functions";
import * as R from "ramda";

const PREFIX = "AI";
const types = ["SEND_TO_DEEPSEEK"];

const customActions = {
  UPDATE_CURRENT_MESSAGE: "AI_UPDATE_CURRENT_MESSAGE",
  UPDATE_REASONING: "AI_UPDATE_REASONING",
};

const customActionFunctions = {
  updateCurrentMessage: (payload: { fullText: string }) => ({
    type: customActions.UPDATE_CURRENT_MESSAGE,
    payload,
  }),
  updateReasoning: (payload: { fullText: string }) => ({
    type: customActions.UPDATE_REASONING,
    payload,
  }),
};

const actions: any = {
  ...getStartUpActions(`${PREFIX}`),
  ...getAsyncActions(`${PREFIX}`, types),
};

const actionsFunctions: any = {
  ...getStartUpActionsFunctions(actions),
  ...getAsyncActionsFunctions(actions, types),
};

const aa = R.mergeDeepLeft(
  actions,
  R.mergeDeepLeft(actionsFunctions, {
    ...customActionFunctions,
  })
);

export default {
  ...aa,
  ...customActions,
};
