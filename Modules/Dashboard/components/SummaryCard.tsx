import Card from "@/components/custom/Card";
import * as R from "ramda";
import { ReactNode } from "react";

const SummaryCard = ({
  itemKey,
  icon,
  value,
  percentage,
  currency,
  hideHoldings,
}: {
  itemKey: string;
  icon: ReactNode;
  value: number;
  percentage?: number;
  currency: string;
  hideHoldings: boolean;
}) => {
  return (
    <Card className="border-0" title={itemKey} icon={icon}>
      {R.isNotNil(itemKey) && (
        <div className="flex gap-2 items-end pt-3">
          <p className="font-semibold text-xl">
            {value >= 0 && R.isNotNil(percentage)
              ? hideHoldings
                ? `**** ${currency}`
                : `+${value} ${currency}`
              : hideHoldings
              ? `**** ${currency}`
              : `${value} ${currency}`}
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
