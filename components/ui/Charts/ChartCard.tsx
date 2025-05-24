import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

const ChartCard = ({
  title,
  description,
  chartConfig,
  children,
}: {
  title: string;
  description: string;
  chartConfig: ChartConfig;
  children: any;
}) => {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>{children}</ChartContainer>
      </CardContent>
    </Card>
  );
};

export default ChartCard;
