interface BaseProvider {
  detail?: any;
  search?: any;
  edit?: any;
  manage?: any;
  children: any;
}

type DashboardAction = {
  type: string;
  payload?: any;
};

type GlobalState = {
  loading: boolean;
  error: boolean;
  errorModal: boolean;
  data: any[];
};

type DashboardState = {
  search: {
    loading: boolean;
    error: boolean;
    errorModal: boolean;
    data: any[];
  };
};
