import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormikProps } from "formik";
import { useTranslations } from "next-intl";

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
  return (
    <div className="grid gap-3">
      <Label>{t(label)}</Label>
      <Input
        type={type}
        name={name}
        placeholder={t(placeholder)}
        value={formik.values[name]}
        onChange={formik.handleChange}
      />
    </div>
  );
};

export default FormikInput;
