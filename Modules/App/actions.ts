import {
  getAsyncActions,
  getAsyncActionsFunctions,
} from "@/Utils/actions/functions";
import * as R from "ramda";

const PREFIX = "GENERIC";
const types = [
  "APP_LOAD",
  "LOAD",
  "LOGIN",
  "LOGOUT",
  "RESET_PASSWORD",
  "CREATE_NEW_PASSWORD",
];

const actions: any = {
  ...getAsyncActions(`${PREFIX}`, types),
};

const actionsFunctions: any = {
  ...getAsyncActionsFunctions(actions, types),
};

const aa = R.mergeDeepLeft(actions, actionsFunctions);

export default aa;
