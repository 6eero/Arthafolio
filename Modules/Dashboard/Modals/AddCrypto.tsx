import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";
import Modal from "../../../components/modal/Modal";
import Button from "@/components/custom/Button";

const AddCryptoDialog = ({
  visible,
  onCancel,
  onSubmit,
}: {
  visible: boolean;
  onCancel: () => void;
  onSubmit: () => void;
}) => {
  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log("onSubmit", values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Modal
        title={"Add Crypto"}
        description={"Here you can add a cryptocurrency"}
        visible={visible}
        onCancel={onCancel}
        onSubmit={onSubmit}
      >
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label>Email</Label>
            <Input
              name="email"
              placeholder="Enter email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
          </div>
          <div className="grid gap-3">
            <Label>Username</Label>
            <Input
              name="username"
              placeholder="Enter username"
              value={formik.values.username}
              onChange={formik.handleChange}
            />
          </div>
          <div className="grid gap-3">
            <Label>Password</Label>
            <Input
              name="password"
              placeholder="Enter password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
          </div>
        </div>
        <div className="w-full flex gap-4 justify-end">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <button type="submit">Submit</button>
        </div>
      </Modal>
    </form>
  );
};

export default AddCryptoDialog;
