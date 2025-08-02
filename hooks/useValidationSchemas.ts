import * as Yup from "yup";
import { useTranslations } from "next-intl";

export const useValidationSchemas = () => {
  const t = useTranslations("");

  const login = Yup.object({
    username_or_email: Yup.string()
      .required(t("fields.auth.required"))
      .min(3, t("fields.auth.username_min", { min: 3 }))
      .max(100, t("fields.auth.username_max", { max: 100 })),
    password: Yup.string()
      .required(t("fields.auth.required"))
      .min(8, t("fields.auth.password_min", { min: 8 }))
      .matches(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
        t("fields.auth.password_complexity")
      ),
  });

  const register = Yup.object({
    email: Yup.string()
      .email(t("fields.auth.invalid_email"))
      .required(t("fields.auth.required")),
    username: Yup.string()
      .required(t("fields.auth.required"))
      .min(3, t("fields.auth.username_min", { min: 3 }))
      .max(30, t("fields.auth.username_max", { max: 30 }))
      .matches(/^[a-zA-Z0-9_]+$/, t("fields.auth.username_format")),
    password: Yup.string()
      .required(t("fields.auth.required"))
      .min(8, t("fields.auth.password_min", { min: 8 }))
      .matches(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
        t("fields.auth.password_complexity")
      ),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref("password")], t("fields.auth.password_match"))
      .required(t("fields.auth.required")),
  });

  return { login, register };
};
