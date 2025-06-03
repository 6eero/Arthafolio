import { Button } from "@/components/ui/button";
import { Card } from "../ui/card";

const Modal = ({
  title,
  description,
  cancelText = "Cancel",
  submitText = "Confirm",
  width = "400px",
  visible = false,
  onCancel,
  children,
}: {
  title: string;
  description: string;
  cancelText?: string;
  submitText?: string;
  width?: string;
  visible: boolean;
  onCancel: () => void;
  onSubmit: () => void;
  children: React.ReactNode;
}) => {
  return (
    <>
      {visible && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
          onClick={onCancel}
        >
          <Card
            className="p-6"
            style={{ width }}
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <p className="font-semibold text-xl">{title}</p>
              <p className="text-muted-foreground">{description}</p>
            </div>
            <div className="grid gap-4">{children}</div>
            <div className="w-full flex gap-4 justify-end">
              <Button variant="outline" onClick={onCancel}>
                {cancelText}
              </Button>
              <Button type="submit">{submitText}</Button>
            </div>
          </Card>
        </div>
      )}
    </>
  );
};

export default Modal;
