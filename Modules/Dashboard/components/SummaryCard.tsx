import Card from "@/components/custom/Card";
import { LucideIcon } from "lucide-react";

const SummaryCard = ({
  title,
  icon,
  value,
}: {
  title: string;
  icon: LucideIcon;
  value: number;
}) => {
  return (
    <Card title={title} icon={icon}>
      <p className="font-semibold text-xl">{`${value.toFixed(2)} €`}</p>
    </Card>
  );
};

export default SummaryCard;
