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
  return (
    <Card className="h-full w-full">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center gap-2">
            {title}
            {R.isNotNil(Icon) && <Icon />}
          </div>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
        <CardAction>{action}</CardAction>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default CustomCard;
