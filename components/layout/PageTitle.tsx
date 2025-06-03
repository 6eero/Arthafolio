import { Button } from "../ui/button";
import * as R from "ramda";

type ActionButton = {
  variant: "default" | "secondary" | "destructive" | "outline";
  label: string;
  onclick: () => void;
};

const PageTitle = ({
  title,
  buttons,
}: {
  title: string;
  buttons: ActionButton[];
}) => {
  return (
    <div className="flex w-full justify-between pb-10">
      <p className="font-semibold text-2xl">{title}</p>
      <div className="flex gap-4">
        {R.map((el: ActionButton) => (
          <Button key={el.label} variant={el.variant} onClick={el.onclick}>
            {el.label}
          </Button>
        ))(buttons)}
      </div>
    </div>
  );
};

export default PageTitle;
