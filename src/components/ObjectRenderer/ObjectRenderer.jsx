import React from "react";
import useStore from "../../zustandStore/store";
import { SHAPES_MAP } from "../../constants/shapeConfigs";

const ObjectRenderer = ({ objectProps }) => {
  const { shapeId, id } = objectProps;
  const { setSelectedObjectId } = useStore();

  const handleObjectClick = (e) => {
    e.stopPropagation();
    setSelectedObjectId(id);
  };

  const geometry = SHAPES_MAP[shapeId]?.geometry;
  return (
    <mesh
      name={objectProps.id}
      onClick={handleObjectClick}
      position={objectProps.position}
      rotation={objectProps.rotation}
      scale={objectProps.scale}
      castShadow
    >
      {geometry}
      <meshStandardMaterial color="royalblue" />
    </mesh>
  );
};

export default ObjectRenderer;
