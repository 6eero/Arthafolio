import { Button } from "../ui/button";
import * as R from "ramda";
import { DialogTrigger, Dialog } from "@/components/ui/dialog";

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
          <div key={el.label}>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant={el.variant} onClick={el.onclick}>
                  {el.label}
                </Button>
              </DialogTrigger>
            </Dialog>
          </div>
        ))(buttons)}
      </div>
    </div>
  );
};

export default PageTitle;
