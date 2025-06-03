import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Modal from "../../../components/modal/Modal";

const AddCryptoDialog = ({
  visible,
  onCancel,
  onSubmit,
}: {
  visible: boolean;
  onCancel: () => void;
  onSubmit: () => void;
}) => {
  return (
    <Modal
      title={"Add Crypto"}
      description={"Here you can add a cryptocurrency"}
      visible={visible}
      onCancel={onCancel}
      onSubmit={onSubmit}
    >
      <div className="grid gap-4">
        <div className="grid gap-3">
          <Label htmlFor="name-1">Name</Label>
          <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="username-1">Username</Label>
          <Input id="username-1" name="username" defaultValue="@peduarte" />
        </div>
      </div>
    </Modal>
  );
};

export default AddCryptoDialog;
