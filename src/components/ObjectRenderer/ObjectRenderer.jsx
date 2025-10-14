import { SHAPES_MAP } from "../../constants/shapeConfigs";
import useStore from "../../zustandStore/store";

const ObjectRenderer = ({ objectProps }) => {
  const { shapeId, id, position, rotation, scale, material  } = objectProps || {};
  const { setSelectedObjectId, openContextMenu } = useStore();
  


  const handleObjectClick = (e) => {
    e.stopPropagation();
    setSelectedObjectId(id);
  };

  const handleContextMenu = (e)=> {
    e.stopPropagation();
    openContextMenu(e.clientX,e.clientY,id)
  }

  const shapeConfig = SHAPES_MAP[shapeId];
    if (!shapeConfig) {
    console.error(`Shape with shapeId "${shapeId}" not found.`);
    return null; 
  }

  const commonProps = {
    name:id,
    onClick:handleObjectClick,
    onContextMenu:handleContextMenu,
    position,
    rotation,
    scale
  }


  // if(shapeConfig.type === "primitive"){
  //   return (
  //   <mesh
  //     {...commonProps}
  //     castShadow
  //   >
  //     {shapeConfig.geometry}
  //     <meshStandardMaterial color="royalblue" />
  //   </mesh>
  // );
  // }
  if(shapeConfig.type === "model"){
    const ModelComponent = shapeConfig.component;
    return(
      <ModelComponent {...commonProps} materialProps={material} />
    )
  }

  return null
  
};

export default ObjectRenderer;
