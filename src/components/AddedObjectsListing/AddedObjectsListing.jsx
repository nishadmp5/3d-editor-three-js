import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { FaTrashCan } from "react-icons/fa6";
import { TbLayoutList } from "react-icons/tb";
import { SHAPES_MAP } from "../../constants/shapeConfigs";
import useObjectsStore from "../../store/useObjectsStore";

const AddedObjectsListing = () => {
  const { objects, selectedObjectId, setSelectedObjectId, deleteObject } =
    useObjectsStore();
  const [isOpen, setIsOpen] = useState(true);

  const handleDelete = (e, objectId) => {
    e.stopPropagation(); 
    deleteObject(objectId);
  };

  return (
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full p-3 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
        >
          <span className="font-semibold text-gray-800">
            Added Assets ({objects.length})
          </span>
          <TbLayoutList  className="text-gray-500 text-lg"/>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="mt-2 p-2 border border-gray-200 rounded-md bg-white space-y-1">
                {objects.map((obj) => (
                  <button
                    key={obj.id}
                    onClick={() => setSelectedObjectId(obj.id)}
                    className={`w-full flex items-center justify-between p-2 rounded-md transition-colors text-left ${
                      selectedObjectId === obj.id
                        ? "bg-blue-100"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center gap-x-3">
                      <img
                        src={
                          SHAPES_MAP[obj.shapeId]?.image ||
                          "https://via.placeholder.com/40"
                        }
                        alt={SHAPES_MAP[obj.shapeId]?.name}
                        className="w-10 h-10 bg-gray-100 rounded-md object-cover"
                      />
                      <span className="font-medium text-sm text-gray-800">
                        {SHAPES_MAP[obj.shapeId]?.name || "Unknown Object"}
                      </span>
                    </div>
                    <div
                      onClick={(e) => handleDelete(e, obj.id)}
                      className="group p-1.5 rounded-md hover:bg-red-100"
                      title="Delete object"
                    >
                      <FaTrashCan className="text-red-600"/>
                    </div>
                  </button>
                ))}
                {objects.length === 0 && (
                  <p className="text-center text-sm text-gray-500 p-4">
                    No objects in the scene.
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
  );
};

export default AddedObjectsListing;
