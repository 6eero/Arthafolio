"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import CustomButton from "@/components/custom/Button";

import { useGlobalContext } from "@/Context/Global";

import FormikInput from "@/components/formik/Input";
import ErrorAlert from "@/components/error/ErrorAlert";
import { useTranslations } from "next-intl";
import Logo from "@/components/icons/Logo";
import SuccessAlert from "@/components/custom/SuccesAlert";

const LoginMain = ({
  type,
  formik,
  emailConfirmed,
}: {
  type: "login" | "register";
  formik: any;
  emailConfirmed?: boolean;
}) => {
  const { error, loading, emailSent } = useGlobalContext();
  const t = useTranslations(`auth.${type}`);

  const handleRoute = () => {
    if (type === "login") {
      window.location.href = "/register";
    } else if (type === "register") {
      window.location.href = "/login";
    }
  };

  return (
    <>
      <Card className="w-screen bg-transparent border-0 sm:bg-card sm:border sm:w-[450px]">
        <CardHeader className={`flex flex-col justify-center items-center`}>
          <Logo className="w-25" bgColor="var(--text-muted-foreground)" />
          <CardTitle className="mb-6">{t("title")}</CardTitle>

          {error && <ErrorAlert error={error} className="w-full" />}
          {emailSent && type === "register" && (
            <SuccessAlert className="w-full" message={"auth.register.done"} />
          )}
          {emailConfirmed && type === "login" && (
            <SuccessAlert
              className="w-full"
              message={"auth.register.email_confirmed"}
            />
          )}
        </CardHeader>

        <CardContent className="mt-6">
          <div className="flex flex-col gap-8">
            {type === "login" && (
              <FormikInput
                name="username_or_email"
                label={"auth.fields.username_or_email.label"}
                placeholder={"auth.fields.username_or_email.placeholder"}
                formik={formik}
              />
            )}
            {type === "register" && (
              <div className="flex flex-col gap-8">
                <FormikInput
                  name="email"
                  type="email"
                  label={"auth.fields.email.label"}
                  placeholder={"auth.fields.email.placeholder"}
                  formik={formik}
                />

                <FormikInput
                  name="username"
                  label="auth.fields.username.label"
                  placeholder="auth.fields.username.placeholder"
                  formik={formik}
                />
              </div>
            )}
            <FormikInput
              type="password"
              name="password"
              label="auth.fields.password.label"
              placeholder="auth.fields.password.placeholder"
              formik={formik}
            />
            {type === "register" && (
              <FormikInput
                type="password"
                name="password_confirmation"
                label="auth.fields.password_confirmation.label"
                placeholder="auth.fields.password_confirmation.placeholder"
                formik={formik}
              />
            )}
          </div>
          <CustomButton
            loading={loading}
            type="submit"
            className="w-full mt-16"
          >
            {t("proceed")}
          </CustomButton>
        </CardContent>

        <CardFooter className="flex flex-col justify-center mt-6 ">
          <CustomButton type="button" onClick={handleRoute} variant="link">
            {t("switch")}
          </CustomButton>
        </CardFooter>
      </Card>
    </>
  );
};

export default LoginMain;
