"use client";

import CustomButton from "@/components/custom/Button";
import Header from "@/components/layout/Header";
import { ResourceLoader } from "@/components/layout/ResourceLoader";
import ThemeSwitcher from "@/components/layout/ThemeSwitcher";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Formik } from "formik";

import { useTranslations } from "next-intl";

const Settings = () => {
  const t = useTranslations("");

  const appVersion = process.env.NEXT_PUBLIC_APP_VERSION;

  return (
    <ResourceLoader>
      <Formik
        initialValues={{ preferred_currency: "EUR", hide_holdings: false }}
        onSubmit={(values) => {
          // Ora 'values' conterrà i dati aggiornati dalla UI!
          console.log("sumbit", values);
        }}
      >
        {(formik) => (
          <form className="" onSubmit={formik.handleSubmit}>
            <div className="w-full flex flex-col">
              <Header title={t("settings.title")} />
              <div className="flex flex-col md:m-4 mt-4 gap-4">
                <div className="rounded-xl border bg-card text-card-foreground shadow ">
                  <div className="divide-y divide-border">
                    {/* Riga 1: Tema */}
                    <div className="flex items-center justify-between p-4">
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
                    <div className="flex items-center justify-between p-4">
                      <div>
                        <Label className="font-semibold pb-2">
                          {t("settings.change_default_currency")}
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          {t("settings.currency_description")}
                        </p>
                      </div>
                      <Select>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue
                            placeholder={t("settings.select_currency")}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>{t("settings.currency")}</SelectLabel>
                            <SelectItem value="usd">USD</SelectItem>
                            <SelectItem value="eur">EUR</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Riga 3: Nascondi Valori */}
                    <div className="flex items-center justify-between p-4">
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
                      <Switch id="hide_values" />
                    </div>

                    {/* Riga 4: Versione App */}
                    <div className="flex items-center justify-between p-4">
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
                <CustomButton
                  className="self-end"
                  type="submit"
                  disabled={formik.isSubmitting}
                >
                  {t("generic.actions.save")}
                </CustomButton>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </ResourceLoader>
  );
};

export default Settings;
