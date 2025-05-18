import {
  getAsyncActions,
  getAsyncActionsFunctions,
  getStartUpActions,
  getStartUpActionsFunctions,
} from "@/Utils/actions/functions";
import * as R from "ramda";

const PREFIX = "DASHBOARD";
const PREFIX_SEARCH = "SEARCH";
const types = ["LOAD"];

const actions: any = {
  search: {
    ...getStartUpActions(`${PREFIX}_${PREFIX_SEARCH}`),
    ...getAsyncActions(`${PREFIX}_${PREFIX_SEARCH}`, types),
  },
};

const actionsFunctions: any = {
  search: {
    ...getStartUpActionsFunctions(actions.search),
    ...getAsyncActionsFunctions(actions.search, types),
  },
};

const aa = R.mergeDeepLeft(actions, actionsFunctions);
export default aa;
