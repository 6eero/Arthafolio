import {
  getAsyncActions,
  getAsyncActionsFunctions,
} from "@/Utils/actions/functions";
import * as R from "ramda";

const PREFIX = "GENERIC";
const types = ["LOGIN", "WHO_AM_I", "LOGOUT"];

const actions: any = {
  ...getAsyncActions(`${PREFIX}`, types),
};

const actionsFunctions: any = {
  ...getAsyncActionsFunctions(actions, types),
};

const aa = R.mergeDeepLeft(actions, actionsFunctions);

export default aa;
