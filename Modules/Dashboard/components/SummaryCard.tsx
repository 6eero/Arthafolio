import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

const SummaryCard = ({
  title,
  icon: Icon,
  value,
}: {
  title: string;
  icon: LucideIcon;
  value: number;
}) => {
  return (
    <Card className="h-full w-full">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center gap-2">
            {title}
            <Icon />
          </div>
        </CardTitle>
        {/* <CardAction>Card Action</CardAction> */}
      </CardHeader>
      <CardContent>
        <p className="font-semibold text-2xl">{`${value.toFixed(2)} €`}</p>
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
