"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import CustomButton from "@/components/custom/Button";

import { useAppActions } from "@/api/App/tasks";
import { useGlobalContext } from "@/Context/Global";

import { Formik } from "formik";
import FormikInput from "@/components/formik/Input";
import Alert from "@/components/error/Alert";
import { useTranslations } from "next-intl";
import Logo from "@/components/icons/Logo";

const LoginMain = () => {
  const { onLogin } = useAppActions();
  const { error, loading } = useGlobalContext();
  const t = useTranslations("login");

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={(values: { email: string; password: string }) => {
        // const email = "test@example.com";
        // const password = "password123";
        onLogin(values);
      }}
    >
      {(formik) => (
        <form className="" onSubmit={formik.handleSubmit}>
          <Card className="w-[450px] hidden sm:block">
            <CardHeader className="mb-6">
              <CardTitle>{t("title")}</CardTitle>
              <CardDescription>{t("description")}</CardDescription>
            </CardHeader>
            {error && <Alert className="mx-6" error={error} />}
            <CardContent className="mt-6">
              <div className="flex flex-col gap-10">
                <div className="grid gap-3">
                  <FormikInput
                    name="email"
                    label={"login.fields.email.label"}
                    placeholder={"login.fields.email.placeholder"}
                    formik={formik}
                  />
                </div>
                <div className="grid gap-3">
                  <FormikInput
                    name="password"
                    label={"login.fields.password.label"}
                    placeholder={"login.fields.password.placeholder"}
                    formik={formik}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <CustomButton
                    loading={loading}
                    type="submit"
                    className="w-full"
                  >
                    {t("login")}
                  </CustomButton>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="sm:hidden w-screen h-screen p-6 flex flex-col justify-between">
            {error && <Alert className="mb-4" error={error} />}

            <div className="flex flex-col gap-8 pt-26">
              <div className="flex flex-col items-center gap-4 pb-6">
                <Logo bgColor="var(--color-card-2)" className="w-20 h-20" />
                <p className="text-xl leading-none font-semibold">
                  {t("title")}
                </p>
              </div>
              <FormikInput
                name="email"
                label={"login.fields.email.label"}
                placeholder={"login.fields.email.placeholder"}
                formik={formik}
              />

              <FormikInput
                name="password"
                label={"login.fields.password.label"}
                placeholder={"login.fields.password.placeholder"}
                formik={formik}
              />
            </div>

            <CustomButton loading={loading} type="submit" className="w-full">
              {t("login")}
            </CustomButton>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default LoginMain;
