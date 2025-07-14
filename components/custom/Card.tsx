import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";
import * as R from "ramda";
import { useTranslations } from "next-intl";
import clsx from "clsx";

const CustomCard = ({
  title,
  icon: Icon,
  description,
  action,
  children,
  className,
}: {
  title?: string;
  icon?: LucideIcon;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) => {
  const t = useTranslations("");
  return (
    <div
      className={clsx(
        "w-full bg-card text-card-foreground rounded-xl border sm:p-6 p-4 shadow-sm",
        className
      )}
    >
      {/* title */}
      {R.isNotNil(title) && (
        <div className="flex justify-between">
          <div className="flex items-center gap-2 pb-2">
            <p className="leading-none font-semibold">{t(title)}</p>
            {R.isNotNil(Icon) && <Icon color="var(--accent)" />}
          </div>
          {action}
        </div>
      )}

      {/* description */}
      {R.isNotNil(description) && (
        <p className="text-muted-foreground text-sm">{t(description)}</p>
      )}

      {/* children */}
      <div>{children}</div>
    </div>
  );
};

export default CustomCard;
