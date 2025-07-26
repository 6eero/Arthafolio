import AI from "@/Modules/AI/AI";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useTranslations } from "next-intl";
import React from "react";

const AISheet = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
}) => {
  const t = useTranslations("");
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right" className="!w-full sm:!w-3/4">
        <VisuallyHidden>
          <SheetHeader>
            <SheetTitle>{t("dashboard.ai_sheet.title")}</SheetTitle>
          </SheetHeader>
        </VisuallyHidden>
        <div className="h-full overflow-y-auto px-4 py-6">
          <AI />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AISheet;
