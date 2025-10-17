import { FaTrashCan } from "react-icons/fa6";
import { IoCopyOutline, IoMove } from "react-icons/io5";
import { MdOutlineRotate90DegreesCcw } from "react-icons/md";
import useObjectsStore from "../../store/useObjectsStore";
import { useUIStore } from "../../store/useUIStore";

const ContextMenu = () => {
  const {
    duplicateObject,
    deleteObject,
    updateObjectProperties,
  } = useObjectsStore();
  const { contextMenu,closeContextMenu } = useUIStore()

  const targetObjectId = contextMenu.targetId

  const targetObject = useObjectsStore((state) =>
    state.objects.find((obj) => obj.id === targetObjectId)
  );

  if (!contextMenu.visible || !targetObject) {
    return null;
  }

  const handleDelete = () => {
    deleteObject(targetObject.id);
    closeContextMenu();
  };

  const handleDuplicate = () => {
    // Placeholder for duplicate functionality
    console.log("Duplicate object:", targetObject.id);
    duplicateObject(targetObject.id);
    closeContextMenu();
  };

  const handleTransformChange = (transformProperty) => {
    updateObjectProperties(targetObject.id, {
      transformMode: transformProperty,
    });
    closeContextMenu();
  };

  const RadioButton = ({ selected }) => (
    <div
      className={`w-5 h-5 flex items-center justify-center border-2 rounded-full ${
        selected ? "border-primary" : "border-gray-400"
      }`}
    >
      {selected && <div className="w-2.5 h-2.5 bg-primary rounded-full" />}
    </div>
  );

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={closeContextMenu} />

      <div
        className="fixed bg-white rounded-lg shadow-xl p-1.5 z-50 border border-gray-200 w-48 space-y-1"
        style={{ top: `${contextMenu.y}px`, left: `${contextMenu.x}px` }}
      >
        {/* --- Actions --- */}
        <button
          onClick={handleDelete}
          className="flex items-center gap-x-2.5 w-full px-3 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors"
        >
          <FaTrashCan className="" />
          Delete
        </button>
        <button
          onClick={handleDuplicate}
          className="flex items-center gap-x-2.5 w-full px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
        >
          <IoCopyOutline className="text-base"/>
          Duplicate
        </button>

        <hr className="my-1.5 border-gray-200" />

        {/* --- Transform Options --- */}
        <div>
          <p className="px-3 pt-1 pb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Transform
          </p>
          <div className="space-y-1">
            <button
              onClick={() => handleTransformChange("rotate")}
              className="flex items-center gap-x-2.5 w-full px-3 py-1.5 text-sm font-medium text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
            >
              <RadioButton selected={targetObject.transformMode === "rotate"} />
              <MdOutlineRotate90DegreesCcw className="text-base"/>
              <span>Rotate</span>
            </button>
            <button
              onClick={() => handleTransformChange("translate")}
              className="flex items-center gap-x-2.5 w-full px-3 py-1.5 text-sm font-medium text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
            >
              <RadioButton
                selected={targetObject.transformMode === "translate"}
              />
              <IoMove className="text-base" />
              <span>Translate</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContextMenu;
