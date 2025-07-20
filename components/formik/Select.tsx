import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormikProps } from "formik";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import * as R from "ramda";

type Option = {
  key: string;
  value: string;
};

type Props = {
  name: string;
  label?: string;
  options: Option[];
  className: string;
  formik: FormikProps<any>;
};

const FormikSelect = ({ name, label, className, options, formik }: Props) => {
  const t = useTranslations("");

  const handleChange = (value: string) => {
    formik.setFieldValue(name, value);
  };

  return (
    <div className={cn("grid gap-3", className)}>
      {R.isNotNil(label) && <Label htmlFor={name}>{t(label)}</Label>}

      <Select value={formik.values[name]} onValueChange={handleChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={t("settings.select_currency")} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {R.map((option: Option) => (
              <SelectItem key={option.key} value={option.key}>
                {option.value}
              </SelectItem>
            ))(options)}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default FormikSelect;
