import { useFormik } from "formik";
import Modal from "@/components/modal/Modal";
import FormikInput from "@/components/formik/Input";

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
          <FormikInput
            name="email"
            label="Email"
            placeholder="Enter email"
            formik={formik}
          />
          <FormikInput
            name="username"
            label="Username"
            placeholder="Enter username"
            formik={formik}
          />
          <FormikInput
            name="password"
            label="Password"
            placeholder="Enter password"
            formik={formik}
          />
        </div>
      </Modal>
    </form>
  );
};

export default AddCryptoDialog;
