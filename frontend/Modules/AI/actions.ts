import {
  getAsyncActions,
  getAsyncActionsFunctions,
  getStartUpActions,
  getStartUpActionsFunctions,
} from "@/Utils/actions/functions";
import * as R from "ramda";

const PREFIX = "AI";
//const types = [];
const types_with_update = ["GET_PORTFOLIO_VALUATION"];
const update = true;

const actions: any = {
  ...getStartUpActions(`${PREFIX}`),
  ...getAsyncActions(`${PREFIX}`, types_with_update, update),
};

const actionsFunctions: any = {
  ...getStartUpActionsFunctions(actions),
  ...getAsyncActionsFunctions(actions, types_with_update, update),
};

const aa = R.mergeDeepLeft(actions, actionsFunctions);

export default aa;
