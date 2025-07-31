import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

const Alert = ({
  message,
  className,
}: {
  message: string;
  className?: string;
}) => {
  const t = useTranslations("");
  return (
    <div
      className={cn(
        "p-4 bg-primary/5 rounded-md border border-primary/30",
        className
      )}
    >
      <p className="text-primary/80 font-normal text-sm">{`✅ ${t(
        message
      )}`}</p>
    </div>
  );
};

export default Alert;
