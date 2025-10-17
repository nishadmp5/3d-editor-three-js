import React from "react";
import TransformInputRow from "../TransformInputRow/TransformInputRow";
import useObjectsStore from "../../store/useObjectsStore";
import { useActivityStore } from "../../store/useActivityStore";
import { shallow } from "zustand/shallow";

const TransformProperties = () => {
  const { updateObjectProperties } = useObjectsStore();

  const { setLastEditedProperty } = useActivityStore();

  const selectedObjectConfig = useObjectsStore(
    (state) => state.objects.find((obj) => obj.id === state.selectedObjectId),
    shallow
  );

  const handlePropertyChange = (property, axisIndex, value) => {
    if (!selectedObjectConfig) return;

    const currentValues = [...selectedObjectConfig[property]];

    const finalValue =
      property === "rotation" ? value * (Math.PI / 180) : value;

    currentValues[axisIndex] = finalValue;

    updateObjectProperties(selectedObjectConfig.id, {
      [property]: currentValues,
    });

    setLastEditedProperty(property, axisIndex);
  };

  const position = selectedObjectConfig
    ? selectedObjectConfig.position
    : [1, 1, 1];
  const rotation = selectedObjectConfig
    ? selectedObjectConfig.rotation.map((r) => (r * 180) / Math.PI)
    : [1, 1, 1];

  return (
    <div>
      {selectedObjectConfig && (
        <div className="bg-white p-4 rounded-md border border-gray-200 space-y-5">
          <h3 className="text-base font-semibold text-gray-900">
            Transform Properties
          </h3>
          <div className="space-y-4">
            <TransformInputRow
              showX={selectedObjectConfig.axisVisibility.translate.showX}
              showY={selectedObjectConfig.axisVisibility.translate.showY}
              showZ={selectedObjectConfig.axisVisibility.translate.showZ}
              label="Position"
              values={position.map((p) => p.toFixed(2))}
              onValueChange={(axis, value) =>
                handlePropertyChange("position", axis, value)
              }
            />
            <TransformInputRow
              showX={selectedObjectConfig.axisVisibility.rotate.showX}
              showY={selectedObjectConfig.axisVisibility.rotate.showY}
              showZ={selectedObjectConfig.axisVisibility.rotate.showZ}
              label="Rotation"
              values={rotation.map((r) => r.toFixed(1))} // shows degrees
              onValueChange={(axis, value) =>
                handlePropertyChange("rotation", axis, value)
              }
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TransformProperties;
