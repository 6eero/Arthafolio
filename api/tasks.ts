import { useDashboardDispatchContext } from "@/Context/Dashboard";
import * as APIDashboard from "./endpoints";
import actions from "@/Modules/Dashboard/actions";

export const useDashboardSearchActions = () => {
  const dispatch = useDashboardDispatchContext();

  return {
    // Triggered when the /dashboard page loads.
    onLoad: async () => {
      console.log("dispatch base");
      dispatch(actions.search.load({}));

      try {
        const { data } = await APIDashboard.searchDashboard();

        console.log("dispatch success");
        dispatch(actions.search.loadSuccess({ data }));
      } catch (error) {
        console.log("dispatch error", error);
        dispatch(actions.search.loadFail({ error }));
      }
    },
  };
};
