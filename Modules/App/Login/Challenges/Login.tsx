"use client";

import { useAppActions } from "@/api/App/tasks";
import Main from "../Main";
import { Formik } from "formik";
import { useValidationSchemas } from "@/hooks/useValidationSchemas";

const Login = ({ emailConfirmed }: { emailConfirmed?: boolean }) => {
  const { onLogin } = useAppActions();
  const { login } = useValidationSchemas();

  return (
    <Formik
      initialValues={{
        username_or_email: "",
        password: "",
      }}
      validationSchema={login}
      onSubmit={(values) => onLogin(values)}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <Main type="login" formik={formik} emailConfirmed={emailConfirmed} />
        </form>
      )}
    </Formik>
  );
};

export default Login;
