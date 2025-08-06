import { Currency } from "@/app/types/user";
import * as R from "ramda";

const DEFAULT_CURRENCY = "eur";
const CURRENCY_SYMBOLS = {
  eur: "€",
  usd: "$",
} as const;

export const useUserSettings = (userContext: unknown) => {
  const preferredCurrency = R.pathOr(DEFAULT_CURRENCY, [
    "data",
    "preferred_currency",
  ])(userContext);
  const currency =
    CURRENCY_SYMBOLS[preferredCurrency as keyof typeof CURRENCY_SYMBOLS] ||
    (CURRENCY_SYMBOLS.eur as Currency);
  const hideHoldings = R.pathOr(false, ["data", "hide_holdings"])(userContext);

  return { currency, hideHoldings };
};
