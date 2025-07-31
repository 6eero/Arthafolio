"use client";

import { useAppActions } from "@/api/App/tasks";
import Main from "../Main";
import { Formik } from "formik";

const Login = () => {
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
          <Main type="login" formik={formik} />
        </form>
      )}
    </Formik>
  );
};

export default Login;
