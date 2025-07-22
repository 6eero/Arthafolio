import {
  getAsyncActions,
  getAsyncActionsFunctions,
  getStartUpActions,
  getStartUpActionsFunctions,
} from "@/Utils/actions/functions";
import * as R from "ramda";

const PREFIX = "AI";
const types = ["LOAD"];

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
