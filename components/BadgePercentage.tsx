import { Badge } from "./ui/badge";
import { TrendingUpIcon, TrendingDownIcon } from "lucide-react";

const BadgePercentage = ({ percentage }: { percentage: number }) => {
  return (
    <Badge variant="outline" className="flex rounded-lg text-base gap-2">
      {percentage > 0 ? (
        <TrendingUpIcon className="text-green-400" />
      ) : (
        <TrendingDownIcon className="text-red-400" />
      )}
      <p className="font-normal">
        {percentage > 0 ? `+${percentage} %` : `${percentage} %`}
      </p>
    </Badge>
  );
};

export default BadgePercentage;
