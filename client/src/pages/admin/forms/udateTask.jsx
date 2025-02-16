import { useFormik } from "formik";
import { FiSave } from "react-icons/fi";
import CustomInput from "components/ui/custom-inputs/CustomInput";
import CustomTextarea from "components/ui/custom-inputs/CustomTextarea";
import Label from "components/ui/custom-inputs/Label";
import ErrorFormik from "components/ui/ErrorFormik";
import FilledButton from "components/ui/buttons/FilledButton";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { updateTaskSchema } from "utils/forms-schemas";

const UpdateTaskForm = ({ data, onSave, onCancel }) => {
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
      user_id: data?.user_id || "",
      title: data?.title || "",
      description: data?.description || "",
      status: data?.status || "",
      priority: data?.priority || "",
      due_date: data?.due_date || "",
    },
    enableReinitialize: true,

    validationSchema: updateTaskSchema,
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
          <div className="relative z-10 w-full max-w-md rounded-xl bg-white p-6 text-black shadow-lg max-h-[90vh] overflow-y-auto">
            {" "}
            <h3 className="mb-4 text-xl font-semibold">{"Update Task"}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="mb-4">
                <Label text="Title" />
                <CustomInput
                  type="text"
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full"
                  withFocus={true}
                  shape={3}
                />
                <ErrorFormik
                  isError={errors.title && touched.title}
                  error={errors.title}
                  isTouched={touched.title}
                />
              </div>

              <div className="mb-4">
                <Label text="Description" />
                <CustomTextarea
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full"
                  withFocus={true}
                  shape={3}
                />
                <ErrorFormik
                  isError={errors.description && touched.description}
                  error={errors.description}
                  isTouched={touched.description}
                />
              </div>

              <div className="mb-4">
                <Label text="Status" />
                <select
                  name="status"
                  value={values.status}
                  onChange={handleChange}
                  className="w-full rounded-md border p-2"
                >
                  <option value="In progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Deferred">Deferred</option>
                  <option value="Open">Open</option>
                </select>
              </div>

              <div className="mb-4">
                <Label text="Priority" />
                <select
                  name="priority"
                  value={values.priority}
                  onChange={handleChange}
                  className="w-full rounded-md border p-2"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              <div className="mb-6">
                <Label text="Due Date" />
                <input
                  type="date"
                  name="due_date"
                  value={values?.due_date ? values.due_date.split(" ")[0] : ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full rounded-md border p-2"
                />
                <ErrorFormik
                  isError={errors.due_date && touched.due_date}
                  error={errors.due_date}
                  isTouched={touched.due_date}
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={onCancel}
                  className="cursor-pointer rounded-md bg-red-600 px-4 py-2 text-white hover:bg-opacity-80"
                >
                  Cancel
                </button>
                <FilledButton
                  text="Update Task"
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

export default UpdateTaskForm;
