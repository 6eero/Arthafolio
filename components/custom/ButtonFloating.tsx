import { Plus } from "lucide-react";
import Button from "./Button";
import { cn } from "@/lib/utils";

type ButtonFloatingProps = {
  onClick: () => void;
  className?: string;
};

const ButtonFloating = ({ onClick, className }: ButtonFloatingProps) => {
  return (
    <div className={cn("fixed bottom-8 right-8 z-50", className)}>
      <Button
        size="icon"
        className="rounded-full w-14 h-14 shadow-lg"
        onClick={onClick}
      >
        <Plus />
      </Button>
    </div>
  );
};

export default ButtonFloating;
