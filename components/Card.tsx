import { Card, CardHeader, CardTitle } from "@/components/ui/card";
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
    <Card>
      <CardHeader>
        <div className="w-full flex justify-between items-center pb-4">
          <CardTitle>{title}</CardTitle>
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
