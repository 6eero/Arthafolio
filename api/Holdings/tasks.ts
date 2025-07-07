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
      label,
      quantity,
    }: {
      label: string;
      quantity: number;
    }) => {
      dispatch(actions.search.addHolding({}));

      try {
        const { data } = await APIDashboard.addHolding({
          label,
          quantity,
        });

        dispatch(actions.search.addHoldingSuccess({ data }));
      } catch (error) {
        dispatch(actions.search.addHoldingFail({ error }));
      }
    },

    onEditHolding: async ({
      label,
      quantity,
    }: {
      label: string;
      quantity: number;
    }) => {
      dispatch(actions.search.editHolding({}));

      try {
        const { data } = await APIDashboard.editHolding({
          label,
          quantity,
        });

        dispatch(actions.search.editHoldingSuccess({ data }));
      } catch (error) {
        dispatch(actions.search.editHoldingFail({ error }));
      }
    },

    onRemoveHolding: async (label: string) => {
      dispatch(actions.search.removeHolding({}));

      try {
        const { data } = await APIDashboard.removeHolding(label);

        dispatch(actions.search.removeHoldingSuccess({ data }));
      } catch (error) {
        dispatch(actions.search.removeHoldingFail({ error }));
      }
    },
  };
};
