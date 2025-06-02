"use client";

import {
  DashboardSearchContext,
  useDashboardSearchContext,
} from "@/Context/Dashboard";
import { ResourceLoader } from "@/components/layout/ResourceLoader";
import { useDashboardSearchActions } from "@/api/tasks";

const Dashboard = () => {
  const context = useDashboardSearchContext();
  const { onLoad } = useDashboardSearchActions();

  console.log("context", context);

  return (
    <ResourceLoader onLoad={onLoad} context={DashboardSearchContext}>
      <>aaaa</>
    </ResourceLoader>
  );
};

export default Dashboard;
