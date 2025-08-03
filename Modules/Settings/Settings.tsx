"use client";

import CustomButton from "@/components/custom/Button";
import Header from "@/components/layout/Header";
import { ResourceLoader } from "@/components/layout/ResourceLoader";
import ThemeSwitcher from "@/components/layout/ThemeSwitcher";
import { Label } from "@/components/ui/label";
import Select from "@/components/formik/Select";
import Switch from "@/components/formik/Switch";
import { Formik } from "formik";

import { useTranslations } from "next-intl";
import { useAppActions } from "@/api/App/tasks";
import { useGlobalContext } from "@/Context/Global";
import { useRouter } from "next/navigation";

import * as R from "ramda";
import { ArrowLeft } from "lucide-react";

const Settings = () => {
  const t = useTranslations("");
  const { onUpdatePreferences } = useAppActions();
  const { data, loading } = useGlobalContext();
  const router = useRouter();

  const appVersion = process.env.NEXT_PUBLIC_APP_VERSION;

  return (
    <ResourceLoader>
      <Formik
        enableReinitialize
        initialValues={{
          preferred_currency: R.propOr("", "preferred_currency", data),
          hide_holdings: R.propOr("", "hide_holdings", data),
        }}
        onSubmit={(values: {
          preferred_currency: string;
          hide_holdings: boolean;
        }) => {
          onUpdatePreferences(values);
        }}
      >
        {(formik) => {
          return (
            <form onSubmit={formik.handleSubmit}>
              <div className="w-full flex flex-col">
                <Header title={t("settings.title")} />

                <div className="flex flex-col md:m-4 mt-4 gap-4">
                  <div className="w-full flex justify-between">
                    <button
                      type="button"
                      onClick={() => {
                        router.push("/dashboard");
                      }}
                    >
                      <ArrowLeft size={20} />
                    </button>

                    <CustomButton
                      className="self-end"
                      type="submit"
                      disabled={formik.isSubmitting || !formik.dirty}
                      loading={loading}
                    >
                      {t("generic.actions.save")}
                    </CustomButton>
                  </div>

                  <div className="rounded-xl border-0 sm:border bg-transparent sm:bg-card text-card-foreground shadow ">
                    <div className="divide-y divide-border">
                      {/* Riga 1: Tema */}
                      <div className="flex items-center justify-between py-4 sm:p-4">
                        <div>
                          <Label
                            htmlFor="theme-switcher"
                            className="font-semibold pb-2"
                          >
                            {t("settings.change_theme")}
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            {t("settings.theme_description")}
                          </p>
                        </div>
                        <ThemeSwitcher />
                      </div>

                      {/* Riga 2: Valuta */}
                      <div className="flex items-center justify-between py-4 sm:p-4">
                        <div>
                          <Label className="font-semibold pb-2">
                            {t("settings.change_default_currency")}
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            {t("settings.currency_description")}
                          </p>
                        </div>
                        <Select
                          name={"preferred_currency"}
                          formik={formik}
                          options={[
                            { key: "eur", value: "EUR" },
                            { key: "usd", value: "USD" },
                          ]}
                          className="w-[120px]"
                        />
                      </div>

                      {/* Riga 3: Nascondi Valori */}
                      <div className="flex items-center justify-between py-4 sm:p-4">
                        <div>
                          <Label
                            htmlFor="hide_values"
                            className="font-semibold pb-2"
                          >
                            {t("settings.hide_values")}
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            {t("settings.hide_values_description")}
                          </p>
                        </div>
                        <Switch name={"hide_holdings"} formik={formik} />
                      </div>

                      {/* Riga 4: Versione App */}
                      <div className="flex items-center justify-between py-4 sm:p-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">
                            {t("settings.app_version")}
                          </p>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {appVersion}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          );
        }}
      </Formik>
    </ResourceLoader>
  );
};

export default Settings;
