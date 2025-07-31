"use client";
import { GlobalContext, useGlobalContext } from "@/Context/Global";
import { useAppActions } from "@/api/App/tasks";
import { ResourceLoader } from "@/components/layout/ResourceLoader";
import { useSearchParams } from "next/navigation";
import Login from "./Challenges/Login";

const ConfirmEmail = () => {
  const { onConfirmEmail } = useAppActions();
  const searchParams = useSearchParams();
  const { emailConfirmed } = useGlobalContext();

  const token = searchParams.get("token") as string;

  const handleLoad = () => {
    onConfirmEmail(token);
  };
  return (
    <ResourceLoader noWhoAmI onLoad={handleLoad} context={GlobalContext}>
      {emailConfirmed && <Login emailConfirmed />}
    </ResourceLoader>
  );
};

export default ConfirmEmail;
