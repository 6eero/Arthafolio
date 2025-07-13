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
                    type="password"
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

          {/* --- Sezione Mobile (MODIFICATA) --- */}
          {/*
            MODIFICA 1:
            - Usiamo `min-h-dvh` invece di `h-dvh` per garantire che il contenitore occupi almeno
              l'intera altezza del viewport visibile, ma possa crescere se il contenuto è più lungo.
            - Rimuoviamo `justify-between` per permettere al layout di fluire naturalmente.
          */}
          <div className="sm:hidden w-screen min-h-dvh p-6 flex flex-col">
            {error && <Alert className="mb-4 flex-shrink-0" error={error} />}

            {/*
              MODIFICA 2:
              - Aggiungiamo `flex-grow` a questo contenitore per farlo espandere e occupare
                tutto lo spazio verticale disponibile, spingendo il pulsante in basso.
            */}
            <div className="flex flex-col gap-8 pt-16 flex-grow">
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

            {/*
              MODIFICA 3:
              - Rimuoviamo `position: sticky` e `bg-background` perché non più necessari.
              - `flex-shrink-0` previene che questo div si restringa.
              - `pt-4` aggiunge un po' di spazio sopra il pulsante.
            */}
            <div className="flex-shrink-0 pt-4">
              <CustomButton loading={loading} type="submit" className="w-full">
                {t("login")}
              </CustomButton>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default LoginMain;
