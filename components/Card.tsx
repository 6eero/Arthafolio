import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const SectionCards = ({
  title,
  value,
  currency = "€",
  percentage,
}: {
  title: string;
  value: number;
  currency?: string;
  percentage?: number;
}) => {
  return (
    <Card>
      <CardHeader>
        <div className="w-full flex pb-4 items-center">
          <CardTitle>{title}</CardTitle>
          <p className="text-gray-700 pl-2">{percentage} %</p>
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
