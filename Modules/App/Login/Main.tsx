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
}: {
  type: "login" | "register";
  formik: any;
}) => {
  const { error, loading, emailSent } = useGlobalContext();
  const t = useTranslations(`auth.${type}`);
  const tBase = useTranslations("");

  const appVersion = process.env.NEXT_PUBLIC_APP_VERSION;

  const handleRoute = () => {
    if (type === "login") {
      window.location.href = "/register";
    } else if (type === "register") {
      window.location.href = "/login";
    }
  };

  return (
    <>
      <Card className="w-[450px] hidden sm:block">
        <CardHeader
          className={`flex flex-col justify-center items-center ${
            !error && !emailSent && type === "login" ? "mb-16" : ""
          }`}
        >
          <Logo className="w-25" bgColor="var(--text-muted-foreground)" />
          <CardTitle>{t("title")}</CardTitle>
          {error && <ErrorAlert error={error} className="w-full my-6" />}
          {emailSent && type === "login" && (
            <SuccessAlert
              className="w-full my-6"
              message={"auth.register.done"}
            />
          )}
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-10">
            <FormikInput
              name="email"
              type="email"
              label={"auth.fields.email.label"}
              placeholder={"auth.fields.email.placeholder"}
              formik={formik}
            />
            {type === "register" && (
              <FormikInput
                name="username"
                label="auth.fields.username.label"
                placeholder="auth.fields.username.placeholder"
                formik={formik}
              />
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

            <CustomButton loading={loading} type="submit" className="w-full">
              {t("proceed")}
            </CustomButton>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col justify-center mt-6 ">
          <CustomButton type="button" onClick={handleRoute} variant="link">
            {t("switch")}
          </CustomButton>
        </CardFooter>
      </Card>

      {/* Mobile Version */}
      <div className="sm:hidden w-screen min-h-dvh p-6 flex flex-col">
        {error && <ErrorAlert className="mb-4 flex-shrink-0" error={error} />}

        <div className="flex flex-col gap-8 pt-16 flex-grow">
          <div className="flex flex-col items-center gap-4 pb-6">
            <Logo bgColor="var(--color-card-2)" className="w-20 h-20" />
            <p className="text-xl leading-none font-semibold">{t("title")}</p>
            <p className="text-sm text-muted text-center">{t("description")}</p>
          </div>

          <FormikInput
            name="username_or_email"
            label="auth.fields.username_or_email.label"
            placeholder="auth.fields.username_or_email.placeholder"
            formik={formik}
          />

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

          <CustomButton loading={loading} type="submit" className="w-full mt-4">
            {t("proceed")}
          </CustomButton>

          <CustomButton
            type="button"
            onClick={handleRoute}
            variant="link"
            className="mt-2"
          >
            {t("switch")}
          </CustomButton>
        </div>

        <div className="flex-shrink-0 pt-6 flex justify-center">
          <p className="text-sm text-muted">
            {tBase("app_name")} v{appVersion}
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginMain;
