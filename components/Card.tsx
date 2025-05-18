import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BadgePercentage from "./BadgePercentage";

const SectionCards = ({
  title,
  value,
  currency,
  percentage,
}: {
  title: string;
  value: number;
  currency: string;
  percentage: number;
}) => {
  return (
    <Card className="@container/card">
      <CardHeader>
        <div className="w-full flex justify-between items-center pb-2">
          <CardDescription>{title}</CardDescription>
          <BadgePercentage percentage={percentage} />
        </div>

        <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
          {currency}
          {value}
        </CardTitle>
      </CardHeader>
    </Card>
  );
};

export default SectionCards;
