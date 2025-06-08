import Card from "@/components/custom/Card";
import { LucideIcon } from "lucide-react";
import * as R from "ramda";

const SummaryCard = ({
  itemKey,
  icon,
  value,
}: {
  itemKey: string;
  icon: LucideIcon;
  value: number;
}) => {
  return (
    <Card title={itemKey} icon={icon}>
      {R.isNotNil(itemKey) && (
        <p className="font-semibold text-xl">{`${value.toFixed(2)} €`}</p>
      )}
    </Card>
  );
};

export default SummaryCard;
