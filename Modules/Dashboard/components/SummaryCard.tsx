import Card from "@/components/custom/Card";
import DisplayCurrency from "@/components/custom/DisplayCurrency";
import * as R from "ramda";
import { ReactNode } from "react";

const SummaryCard = ({
  itemKey,
  icon,
  value,
  percentage,
}: {
  itemKey: string;
  icon: ReactNode;
  value: number;
  percentage?: number;
}) => {
  return (
    <Card className="border-0 sm:border" title={itemKey} icon={icon}>
      {R.isNotNil(itemKey) && (
        <div className="flex gap-2 items-end pt-3">
          <DisplayCurrency
            showSign={R.isNotNil(percentage)}
            className="font-semibold text-xl"
            value={value}
          />
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
