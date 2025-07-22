import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import * as R from "ramda";

const Alert = ({ error, className }: { error: any; className?: string }) => {
  const t = useTranslations("");
  const error_message = R.pathOr("Errore generico", [
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
      {`❌ ${t(error_message)}`}
    </div>
  );
};

export default Alert;
