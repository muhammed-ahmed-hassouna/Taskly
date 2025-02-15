import { useFormik } from "formik";
import { FiSave } from "react-icons/fi";
import CustomInput from "components/ui/custom-inputs/CustomInput";
import CustomTextarea from "components/ui/custom-inputs/CustomTextarea";
import Label from "components/ui/custom-inputs/Label";
import ErrorFormik from "components/ui/ErrorFormik";
import FilledButton from "components/ui/buttons/FilledButton";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { addTaskSchema } from "utils/forms-schemas";

const AddTask = ({ onSave, onCancel }) => {
  const [showForm, setShowForm] = useState(false);

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
    values,
    isValid,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      title: "",
      description: "",
      status: "",
      priority: "",
      due_date: "",
    },
    validationSchema: addTaskSchema,
    onSubmit: (values) => {
      onSave(values);
    },
  });

  useEffect(() => {
    setShowForm(true);
  }, []);

  return (
    <AnimatePresence>
      {showForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-gray-900 bg-opacity-50"></div>
          <div className="relative z-10 w-full max-w-md rounded-xl bg-white p-4 text-black shadow-lg">
            <h3 className="mb-4 text-xl font-semibold">Add Task</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <Label text="Title" />
                <CustomInput
                  type="text"
                  name="title"
                  value={values?.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full"
                  withFocus={true}
                  shape={3}
                />
                <ErrorFormik
                  isError={errors?.title}
                  error={errors?.title}
                  isTouched={touched?.title}
                />
              </div>
              <div className="mb-4">
                <Label text="Description" />
                <CustomTextarea
                  className="my-custom-class"
                  placeholder="Enter your description here"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isRequired={true}
                  name="description"
                  id="customTextarea"
                  value={values?.description}
                  withFocus={true}
                  isDisable={false}
                  shape={3}
                />
                <ErrorFormik
                  isError={errors?.description}
                  error={errors?.description}
                  isTouched={touched?.description}
                />
              </div>
              <div className="mb-4">
                <Label text="Status" />
                <select
                  name="status"
                  value={values?.status}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full rounded-md border p-2"
                >
                  <option value="" disabled>
                    Select Status
                  </option>
                  <option value="In progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Deferred">Deferred</option>
                  <option value="Open">Open</option>
                </select>
                <ErrorFormik
                  isError={errors?.status}
                  error={errors?.status}
                  isTouched={touched?.status}
                />
              </div>

              <div className="mb-6">
                <Label text="Priority" />
                <select
                  name="priority"
                  value={values?.priority}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full rounded-md border p-2"
                >
                  <option value="" disabled>
                    Select Priority
                  </option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
                <ErrorFormik
                  isError={errors?.priority}
                  error={errors?.priority}
                  isTouched={touched?.priority}
                />
              </div>

              <div className="mb-6">
                <Label text="Due Date" />
                <input
                  type="date"
                  name="due_date"
                  value={values?.due_date}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full rounded-md border p-2"
                />
                <ErrorFormik
                  isError={errors?.due_date}
                  error={errors?.due_date}
                  isTouched={touched?.due_date}
                />
              </div>

              <div className="mb-4 flex gap-4">
                <button
                  type="button"
                  onClick={onCancel}
                  className="cursor-pointer rounded-md bg-red-600 px-4 py-2 text-white hover:bg-opacity-80"
                >
                  Cancel
                </button>
                <FilledButton
                  text="Save"
                  isButton={true}
                  icon={
                    <div className="m-1">
                      <FiSave />
                    </div>
                  }
                  buttonType="submit"
                  className="cursor-pointer rounded-md bg-green-500 px-4 py-2 text-white hover:bg-opacity-80"
                  width="w-20"
                  isDisable={!isValid}
                />
              </div>
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddTask;
