import React from "react";
import TransformInputRow from "../TransformInputRow/TransformInputRow";
import useStore from "../../zustandStore/store";

const TransformProperties = () => {
  const { objects, selectedObjectId, updateObjectProperties, deleteObject } = useStore();

  const selectedObject = objects.find((obj) => obj.id === selectedObjectId);

  const handlePropertyChange = (property,axisIndex,value) => {
    if(!selectedObject) return; 

    const currentValues = [...selectedObject[property]]

    const finalValue =  property === 'rotation' ? value * (Math.PI / 180) : value;

    currentValues[axisIndex] = finalValue

    updateObjectProperties(selectedObject.id,{ [property] : currentValues})
  }

  const handleDelete = () => {
    if(selectedObject){
      deleteObject(selectedObject.id)
    }
  }

  const position = selectedObject ? selectedObject.position : [1, 1, 1];
  const rotation = selectedObject ? selectedObject.rotation : [1, 1, 1];
  const scale = selectedObject ? selectedObject.scale : [1, 1, 1];

  return (
    <div>
      <h2 className="text-lg font-semibold mb-3 border-b pb-2">Inspector</h2>
      {/* Conditionally show the "No object selected" text */}
      {selectedObject ? (
        <p className="text-sm text-black italic mb-4">{`selected object ${selectedObject?.shapeId}-${selectedObject?.id}`}</p>
      ) : (
        <p className="text-sm text-gray-500 italic mb-4">No object selected</p>
      )}

      <div className="space-y-4">
        <h3 className="font-bold text-md">Transform</h3>
        <TransformInputRow label="Position" values={position.map((p)=> p.toFixed(2))} onValueChange={(axis,value) => handlePropertyChange("position",axis,value)} />
        <TransformInputRow label="Rotation"  values={rotation.map(r => (r * 180 / Math.PI).toFixed(1))}  onValueChange={(axis,value) => handlePropertyChange("rotation",axis,value)}/>
        <TransformInputRow label="Scale" values={scale.map(s => s.toFixed(2))} onValueChange={(axis,value) => handlePropertyChange("scale",axis,value)} />
      </div>

       <div className="mt-6">
            <button
              onClick={handleDelete}
              className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-colors"
            >
              Delete Object
            </button>
          </div>
    </div>
  );
};

export default TransformProperties;
