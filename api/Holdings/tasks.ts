import { useDashboardDispatchContext } from "@/Context/Dashboard";
import * as APIDashboard from "./endpoints";
import actions from "@/Modules/Dashboard/actions";

export const useDashboardSearchActions = () => {
  const dispatch = useDashboardDispatchContext();

  return {
    // Triggered when the /dashboard page loads.
    onLoad: async () => {
      dispatch(actions.search.load({}));

      try {
        const { data } = await APIDashboard.searchDashboard();

        dispatch(actions.search.loadSuccess({ data }));
      } catch (error) {
        dispatch(actions.search.loadFail({ error }));
      }
    },

    onAddHolding: async ({
      ticker,
      quantity,
    }: {
      ticker: string;
      quantity: number;
    }) => {
      dispatch(actions.search.addHolding({}));

      try {
        const { data } = await APIDashboard.addHolding({
          ticker,
          quantity,
        });

        dispatch(actions.search.addHoldingSuccess({ data }));
      } catch (error) {
        dispatch(actions.search.addHoldingFail({ error }));
      }
    },
  };
};
