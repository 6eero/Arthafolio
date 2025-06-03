import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const FormikInput = ({
  name,
  placeholder,
  label,
}: {
  name: string;
  placeholder: string;
  label: string;
}) => {
  return (
    <div className="grid gap-3">
      <Label>{label}</Label>
      <Input
        name={name}
        placeholder={placeholder}
        value={formik.values.name}
        onChange={formik.handleChange}
      />
    </div>
  );
};

export default FormikInput;
