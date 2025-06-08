import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";
import * as R from "ramda";
import { useTranslations } from "next-intl";

const CustomCard = ({
  title,
  icon: Icon,
  description,
  action,
  children,
}: {
  title: string;
  icon?: LucideIcon;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
}) => {
  const t = useTranslations("");
  return (
    <Card className="h-full w-full">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center gap-2">
            {t(title)}
            {R.isNotNil(Icon) && <Icon />}
          </div>
        </CardTitle>
        {R.isNotNil(description) && (
          <CardDescription>{t(description)}</CardDescription>
        )}
        <CardAction>{action}</CardAction>
      </CardHeader>
      <CardContent className="h-full">{children}</CardContent>
    </Card>
  );
};

export default CustomCard;
