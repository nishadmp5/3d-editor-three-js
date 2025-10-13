import React from "react";
import useStore from "../../zustandStore/store";
import { SHAPES_MAP } from "../../constants/shapeConfigs";

const ObjectRenderer = ({ objectProps }) => {
  const { shapeId, id, position, rotation, scale } = objectProps || {};
  const { setSelectedObjectId } = useStore();

  const handleObjectClick = (e) => {
    e.stopPropagation();
    setSelectedObjectId(id);
  };

  const shapeConfig = SHAPES_MAP[shapeId];
    if (!shapeConfig) {
    console.error(`Shape with shapeId "${shapeId}" not found.`);
    return null; 
  }

  const commonProps = {
    name:id,
    onClick:handleObjectClick,
    position,
    rotation,
    scale
  }

  if(shapeConfig.type === "primitive"){
    return (
    <mesh
      {...commonProps}
      castShadow
    >
      {shapeConfig.geometry}
      <meshStandardMaterial color="royalblue" />
    </mesh>
  );
  }
  if(shapeConfig.type === "model"){
    const ModelComponent = shapeConfig.component;
    return(
      <ModelComponent {...commonProps}/>
    )
  }

  return null
  
};

export default ObjectRenderer;
