import * as Yup from "yup";
import { useTranslations } from "next-intl";

export const useValidationSchemas = () => {
  const t = useTranslations("");

  const login = Yup.object({
    username_or_email: Yup.string()
      .required(t("fields.auth.required"))
      .min(3, t("fields.auth.username_min", { min: 3 })),
    password: Yup.string()
      .required(t("fields.auth.required"))
      .min(6, t("fields.auth.password_min", { min: 6 })),
  });

  const register = Yup.object({
    email: Yup.string()
      .email(t("fields.auth.invalid_email"))
      .required(t("fields.auth.required")),
    username: Yup.string()
      .required(t("fields.auth.required"))
      .min(3, t("fields.auth.username_min", { min: 3 })),
    password: Yup.string()
      .required(t("fields.auth.required"))
      .min(6, t("fields.auth.password_min", { min: 6 })),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref("password")], t("fields.auth.password_match"))
      .required(t("fields.auth.required")),
  });

  return { login, register };
};
