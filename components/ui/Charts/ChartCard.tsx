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
    <Card>
      <CardHeader>
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
