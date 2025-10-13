import React from "react";
import useStore from "../../zustandStore/store";
import { SHAPES } from "../../constants/shapeConfigs";
import TransformInputRow from "../../components/TransformInputRow/TransformInputRow";
import TransformProperties from "../../components/TransformProperties/TransformProperties";

const Sidebar = () => {
  // const addObject = useStore((state) => state.addObject);

  // const handleObjectAddClick = (shapeId) => {
  //   addObject(shapeId);
  // };

  const handleDragStart = (event, shapeId) => {
    event.dataTransfer.setData("text/plain", shapeId);
  };

  return (
    <div className="w-full h-full bg-gray-100 p-4 overflow-y-auto border-l border-gray-300">
      {/* Section for adding new objects */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3 border-b pb-2">Add Object</h2>
        <div className="grid grid-cols-2 gap-2">
          {SHAPES.map((shapeData) => (
            <button
              draggable="true"
              // onClick={() => handleObjectAddClick(shapeData.shapeId)}
              onDragStart={(e) => handleDragStart(e, shapeData.shapeId)}
              className="bg-white p-2 rounded-md border border-gray-200 flex flex-col items-center justify-center hover:border-blue-500 hover:shadow-sm transition-all duration-150"
              title={`Drag to add ${shapeData.name}`}
            >
              <img
                src={shapeData.image}
                alt={shapeData.name}
                className="w-12 h-12 object-contain pointer-events-none"
              />
              {shapeData.name}
            </button>
          ))}
        </div>
      </div>

      <TransformProperties />
    </div>
  );
};

export default Sidebar;
