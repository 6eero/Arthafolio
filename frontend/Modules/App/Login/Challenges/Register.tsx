"use client";

import { useAppActions } from "@/api/App/tasks";
import Main from "../Main";
import { Formik } from "formik";
import { useValidationSchemas } from "@/hooks/useValidationSchemas";

const Login = () => {
  const { onRegister } = useAppActions();
  const { register } = useValidationSchemas();

  return (
    <Formik
      initialValues={{
        email: "",
        username: "",
        password: "",
        password_confirmation: "",
      }}
      validationSchema={register}
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
