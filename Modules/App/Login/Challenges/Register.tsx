"use client";

import { useAppActions } from "@/api/App/tasks";
import Main from "../Main";
import { Formik } from "formik";

const Login = () => {
  const { onRegister } = useAppActions();
  return (
    <Formik
      initialValues={{
        email: "",
        username: "",
        password: "",
        password_confirmation: "",
      }}
      onSubmit={(values) => onRegister(values)}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <Main type="register" formik={formik} />
        </form>
      )}
    </Formik>
  );
};

export default Login;
