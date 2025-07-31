"use client";

import { useAppActions } from "@/api/App/tasks";
import Main from "../Main";
import { Formik } from "formik";

const Login = ({ emailConfirmed }: { emailConfirmed: boolean }) => {
  const { onLogin } = useAppActions();
  return (
    <Formik
      initialValues={{
        username_or_email: "",
        password: "",
      }}
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
