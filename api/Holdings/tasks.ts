import { useDashboardDispatchContext } from "@/Context/Dashboard";
import * as APIDashboard from "./endpoints";
import actions from "@/Modules/Dashboard/actions";
import { TimeframeKey } from "@/Utils/types/timeframes";

export const useDashboardActions = () => {
  const dispatch = useDashboardDispatchContext();

  return {
    // Triggered when the /dashboard page loads and on the press of one of the toggle item in the line chart.
    onLoad: async () => {
      dispatch(actions.load({}));

      const timeframe = "D";

      try {
        const { data } = await APIDashboard.searchDashboard(timeframe);

        dispatch(actions.loadSuccess({ data }));
      } catch (error) {
        dispatch(actions.loadFail({ error }));
      }
    },

    onChangeTimeframe: async (timeframe: TimeframeKey = "D") => {
      dispatch(actions.changeTimeframe({ timeframe }));

      try {
        const { data } = await APIDashboard.searchDashboard(timeframe);

        dispatch(actions.changeTimeframeSuccess({ data }));
      } catch (error) {
        dispatch(actions.changeTimeframeFail({ error }));
      }
    },

    onAddHolding: async ({
      label,
      quantity,
    }: {
      label: string;
      quantity: number;
    }) => {
      dispatch(actions.addHolding({}));

      try {
        const { data } = await APIDashboard.addHolding({
          label,
          quantity,
        });

        dispatch(actions.addHoldingSuccess({ data }));
      } catch (error) {
        dispatch(actions.addHoldingFail({ error }));
      }
    },

    onEditHolding: async ({
      label,
      quantity,
    }: {
      label: string;
      quantity: number;
    }) => {
      dispatch(actions.editHolding({}));

      try {
        const { data } = await APIDashboard.editHolding({
          label,
          quantity,
        });

        dispatch(actions.editHoldingSuccess({ data }));
      } catch (error) {
        dispatch(actions.editHoldingFail({ error }));
      }
    },

    onRemoveHolding: async (label: string) => {
      dispatch(actions.removeHolding({}));

      try {
        const { data } = await APIDashboard.removeHolding(label);

        dispatch(actions.removeHoldingSuccess({ data }));
      } catch (error) {
        dispatch(actions.removeHoldingFail({ error }));
      }
    },
  };
};
