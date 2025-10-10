import React from "react";
import useStore from "../../zustandStore/store";
import { SHAPES } from "../../constants/shapeConfigs";
import TransformInputRow from "../../components/TransformInputRow/TransformInputRow";
import TransformProperties from "../../components/TransformProperties/TransformProperties";

const Sidebar = () => {
  const addObject = useStore((state) => state.addObject);

  const handleObjectAddClick = (shapeId) => {
    addObject(shapeId);
  };

  return (
    <div className="w-full h-full bg-gray-100 p-4 overflow-y-auto border-l border-gray-300">
      {/* Section for adding new objects */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3 border-b pb-2">Add Object</h2>
        <div className="grid grid-cols-2 gap-2">
          {SHAPES.map((shapeData) => (
            <button
              onClick={() => handleObjectAddClick(shapeData.shapeId)}
              className="bg-gray-200 hover:bg-gray-300 p-2 rounded"
            >
              {shapeData.name}
            </button>
          ))}
        </div>
      </div>

          <TransformProperties/>
    </div>
  );
};

export default Sidebar;
