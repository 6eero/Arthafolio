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
      <div className="flex justify-between items-center p-3">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <Separator orientation="vertical" className="!h-6" />
          <p>{title}</p>
        </div>
        <div className="flex gap-2">
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
