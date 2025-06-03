import * as R from "ramda";
import { DialogTrigger, Dialog } from "@/components/ui/dialog";
import CustomButton from "../custom/Button";

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
                <CustomButton variant={el.variant} onClick={el.onclick}>
                  {el.label}
                </CustomButton>
              </DialogTrigger>
            </Dialog>
          </div>
        ))(buttons)}
      </div>
    </div>
  );
};

export default PageTitle;
