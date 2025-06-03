import { Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ComponentPropsWithoutRef } from "react";
import { useDashboardSearchContext } from "@/Context/Dashboard";

type CustomButtonProps = {
  loading?: boolean;
} & ComponentPropsWithoutRef<typeof Button>;

const CustomButton = ({
  loading: loadingProp,
  children,
  ...props
}: CustomButtonProps) => {
  const context = useDashboardSearchContext();
  const loading = loadingProp ?? context?.loading ?? false;

  return (
    <Button disabled={loading} {...props}>
      {loading && <Loader2Icon className="animate-spin" />}
      {children}
    </Button>
  );
};

export default CustomButton;
