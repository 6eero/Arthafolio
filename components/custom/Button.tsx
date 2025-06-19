import { Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ComponentPropsWithoutRef } from "react";

type CustomButtonProps = {
  loading?: boolean;
} & ComponentPropsWithoutRef<typeof Button>;

const CustomButton = ({ loading, children, ...props }: CustomButtonProps) => {
  return (
    <Button disabled={loading} {...props}>
      {loading && <Loader2Icon className="animate-spin" />}
      {children}
    </Button>
  );
};

export default CustomButton;
