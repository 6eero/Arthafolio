import Modal from "@/components/modals/Modal";
import { useTranslations } from "next-intl";

const DangerModal = ({
  title,
  message,
  open = false,
  setOpen,
  onSubmitClick,
}: {
  title: string;
  message: string;
  submitText?: string;
  cancelText?: string;
  open: boolean;
  setOpen: (value: boolean) => void;
  onSubmitClick: any;
}) => {
  const t = useTranslations("");
  return (
    <Modal
      title={title}
      message={message}
      open={open}
      setOpen={setOpen}
      onSubmitClick={onSubmitClick}
      submitText={t("generic.actions.delete")}
      type="danger"
    />
  );
};

export default DangerModal;
