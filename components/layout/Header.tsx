import { Separator } from "@/components/ui/separator";
import CustomButton from "../custom/Button";
import { SidebarTrigger } from "../ui/sidebar";
import * as RA from "ramda-adjunct";

type Button = {
  variant:
    | "outline"
    | "link"
    | "default"
    | "destructive"
    | "secondary"
    | "ghost";
  text: string;
  onClick: () => void;
};

const Header = ({ title, buttons }: { title: string; buttons: Button[] }) => {
  return (
    <>
      <div className="flex  gap-3 p-3 flex-row items-center justify-between">
        <div className="flex items-center gap-3">
          <SidebarTrigger />
          <Separator orientation="vertical" className="!h-6 hidden sm:block" />
          <p className="text-lg font-semibold">{title}</p>
        </div>

        <div className="flex flex-wrap gap-2 sm:flex-nowrap">
          {RA.mapIndexed((button: Button, idx: number) => (
            <CustomButton
              key={idx}
              onClick={button.onClick}
              variant={button.variant}
            >
              {button.text}
            </CustomButton>
          ))(buttons)}
        </div>
      </div>

      <Separator />
    </>
  );
};

export default Header;
