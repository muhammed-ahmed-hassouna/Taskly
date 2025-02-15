import CustomField from "components/ui/CustomField";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ShowDetailsTask = ({ details, onCancel }) => {
  const [ShowDetails, setShowDetails] = useState(false);

  const priorityColors = {
    high: "#ff0000",
    medium: "#ffa500",
    low: "#008000",
  };

  useEffect(() => {
    setShowDetails(true);
  }, []);

  return (
    <AnimatePresence>
      {ShowDetails && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-gray-900 bg-opacity-50"></div>
          <div className="relative z-10 w-full max-w-md rounded-xl bg-white p-4 text-black shadow-lg">
            <h3 className="mb-4 text-xl font-semibold">Task Details</h3>
            <div>
              <div>
                <CustomField label="Title" value={details?.title} />
              </div>

              <div>
                <CustomField label="Description" value={details?.description} />
              </div>

              <div>
                <CustomField label="Status" value={details?.status} />
              </div>

              <div>
                <CustomField
                  label="Priority"
                  value={details?.priority}
                  style={{
                    color: priorityColors[details?.priority.toLowerCase()],
                  }}
                />
              </div>

              <div>
                <CustomField
                  label="Due Date"
                  value={
                    details?.due_date ? details.due_date.split(" ")[0] : ""
                  }
                />
              </div>
              <div className="mt-4">
                <button
                  type="button"
                  onClick={onCancel}
                  className="cursor-pointer rounded-md bg-red-600 px-4 py-2 text-white hover:bg-opacity-80"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default ShowDetailsTask;
