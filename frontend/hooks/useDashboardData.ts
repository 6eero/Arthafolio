import { Asset, DashboardData, Totals } from "@/app/types/dashboard";
import * as R from "ramda";

export const useDashboardData = (context: unknown): DashboardData => {
  const totals = R.pathOr<Totals>({ total: 0 }, ["data", "totals"])(context);
  const history = R.pathOr([], ["data", "history"])(context);
  const assets = R.pathOr<Asset[]>([], ["data", "assets"])(context);

  const profitLoss = {
    day: R.pathOr({ value: 0, percent: 0 }, [
      "data",
      "totals",
      "profit_loss",
      "day",
    ])(context),
    week: R.pathOr({ value: 0, percent: 0 }, [
      "data",
      "totals",
      "profit_loss",
      "week",
    ])(context),
    month: R.pathOr({ value: 0, percent: 0 }, [
      "data",
      "totals",
      "profit_loss",
      "month",
    ])(context),
  };
  const priceHistory = R.pathOr([], ["priceHistoryData", "history"])(context);

  return { totals, history, assets, profitLoss, priceHistory };
};
