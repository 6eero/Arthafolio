import { cn } from "@/lib/utils";
import * as R from "ramda";

const Alert = ({ error, className }: { error: any; className: string }) => {
  return (
    <div
      className={cn(
        "p-4 bg-red-950/40 rounded-md border border-red-900",
        className
      )}
    >
      {R.pathOr("Errore generico", ["response", "data", "message"])(error)}
    </div>
  );
};

export default Alert;
