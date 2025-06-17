import {
  getAsyncActions,
  getAsyncActionsFunctions,
} from "@/Utils/actions/functions";
import * as R from "ramda";

const PREFIX = "GENERIC";
const types = ["LOGIN"];

const actions: any = {
  ...getAsyncActions(`${PREFIX}`, types),
};

const actionsFunctions: any = {
  ...getAsyncActionsFunctions(actions, types),
};

const aa = R.mergeDeepLeft(actions, actionsFunctions);

console.log("8y78", aa);

export default aa;
