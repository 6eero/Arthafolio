import { Button } from "@/app/types/generic";
import CustomButton from "./Button";
import * as RA from "ramda-adjunct";

const ButtonsRow = ({ buttons }: { buttons: Button[] }) => {
  return (
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
  );
};

export default ButtonsRow;
