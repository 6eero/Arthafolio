import {
  getAsyncActions,
  getAsyncActionsFunctions,
  getStartUpActions,
  getStartUpActionsFunctions,
} from "@/Utils/actions/functions";
import * as R from "ramda";

const PREFIX = "DASHBOARD";
const types = [
  "ADD_HOLDING",
  "REMOVE_HOLDING",
  "EDIT_HOLDING",
  "CHANGE_TIMEFRAME",
];

const actions: any = {
  ...getStartUpActions(`${PREFIX}`),
  ...getAsyncActions(`${PREFIX}`, types),
};

const actionsFunctions: any = {
  ...getStartUpActionsFunctions(actions),
  ...getAsyncActionsFunctions(actions, types),
};

const aa = R.mergeDeepLeft(actions, actionsFunctions);
export default aa;
