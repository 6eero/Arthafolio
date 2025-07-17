import Card from "@/components/custom/Card";
import { LucideIcon } from "lucide-react";
import * as R from "ramda";

const SummaryCard = ({
  itemKey,
  icon,
  value,
  percentage,
}: {
  itemKey: string;
  icon: LucideIcon;
  value: number;
  percentage?: number;
}) => {
  return (
    <Card title={itemKey} icon={icon}>
      {R.isNotNil(itemKey) && (
        <div className="flex gap-2 items-end pt-3">
          <p className="font-semibold text-xl">
            {value >= 0 && R.isNotNil(percentage)
              ? `+${value} €`
              : `${value} €`}
          </p>
          {R.isNotNil(percentage) && (
            <p className="text-muted-foreground">
              {percentage >= 0 ? `+${percentage} %` : `${percentage} %`}
            </p>
          )}
        </div>
      )}
    </Card>
  );
};

export default SummaryCard;
