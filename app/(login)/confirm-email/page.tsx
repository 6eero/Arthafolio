import ConfirmEmail from "@/Modules/App/Login/ConfirmEmail";
import { Suspense } from "react";

const Login = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConfirmEmail />
    </Suspense>
  );
};

export default Login;
