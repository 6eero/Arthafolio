import { Badge } from "./ui/badge";
import { TrendingUpIcon, TrendingDownIcon } from "lucide-react";

const BadgePercentage = ({ percentage }: { percentage: number }) => {
  return (
    <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
      {percentage > 0 ? (
        <TrendingUpIcon className="size-3 text-green-400" />
      ) : (
        <TrendingDownIcon className="size-3 text-red-400" />
      )}
      {percentage > 0 ? `+${percentage}` : percentage}
    </Badge>
  );
};

export default BadgePercentage;
