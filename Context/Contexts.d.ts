import { TimeframeKey } from "@/Utils/types/timeframes";
interface BaseProvider {
  detail?: any;
  search?: any;
  edit?: any;
  manage?: any;
  children: any;
}

type GlobalState = {
  loading: boolean;
  error: boolean;
  errorModal: boolean;
  [key: string]: any;
};

type DashboardAction = {
  type: string;
  payload?: any;
};

type DashboardState = {
  search: {
    loading: boolean;
    error: boolean;
    errorModal: boolean;
    data: any[];
    timeframe: TimeframeKey;
  };
};

type AIAction = {
  type: string;
  payload?: any;
};

type AIState = {
  loading: boolean;
  error: boolean;
  errorModal: boolean;
  data: any[];
};
