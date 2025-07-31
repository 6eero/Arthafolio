import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import * as R from "ramda";

const ErrorAlert = ({
  error,
  className,
}: {
  error: any;
  className?: string;
}) => {
  const t = useTranslations("");
  const error_message = R.pathOr("generic.error.generic", [
    "response",
    "data",
    "message",
  ])(error);

  return (
    <div
      className={cn(
        "p-4 bg-red-950/40 rounded-md border border-red-900",
        className
      )}
    >
      <p className="text-destructive/70 font-normal text-sm">{`❌ ${t(
        error_message
      )}`}</p>
    </div>
  );
};

export default ErrorAlert;
