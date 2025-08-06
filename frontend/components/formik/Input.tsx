import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormikProps } from "formik";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

const FormikInput = ({
  name,
  placeholder,
  label,
  type,
  formik,
}: {
  name: string;
  placeholder: string;
  label: string;
  type?: string;
  formik: FormikProps<any>;
}) => {
  const t = useTranslations("");

  const error = formik.errors[name];
  const touched = formik.touched[name];
  const showError = touched && error && typeof error === "string";

  return (
    <div className="grid">
      <Label className="mb-3 " htmlFor={name}>
        {t(label)}
      </Label>
      <Input
        className={cn("", showError && "border-red-500")}
        type={type}
        name={name}
        id={name}
        placeholder={t(placeholder)}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {showError && <span className="text-sm text-red-500 mt-1">{error}</span>}
    </div>
  );
};

export default FormikInput;
