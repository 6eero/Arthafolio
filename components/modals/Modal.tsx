import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import CustomButton from "../custom/Button";
import { useTranslations } from "next-intl";

const Modal = ({
  title,
  message,
  submitText = "Submit",
  cancelText = "Cancel",
  open = false,
  setOpen,
  onSubmitClick,
  type = "submit",
}: {
  title: string;
  message: string;
  submitText?: string;
  cancelText?: string;
  open: boolean;
  setOpen: (value: boolean) => void;
  onSubmitClick: any;
  type?: "danger" | "warning" | "submit";
}) => {
  const t = useTranslations("");

  const handleSubmit = () => {
    onSubmitClick();
    setOpen(false);
  };
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t(title)}</AlertDialogTitle>
          <AlertDialogDescription>{t(message)}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <CustomButton
            onClick={() => {
              setOpen(false);
            }}
            variant={"outline"}
          >
            {cancelText}
          </CustomButton>
          <CustomButton
            onClick={handleSubmit}
            variant={type === "danger" ? "destructive" : "default"}
          >
            {submitText}
          </CustomButton>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Modal;
