import { SHAPES_MAP } from "../../constants/shapeConfigs";
import useObjectsStore from "../../store/useObjectsStore";
import { useUIStore } from "../../store/useUIStore";

const ObjectRenderer = ({ objectProps }) => {
  const { shapeId, id, position, rotation, scale, material } =
    objectProps || {};
  const { setSelectedObjectId } = useObjectsStore();
  const { openContextMenu } = useUIStore();

  const handleObjectClick = (e) => {
    e.stopPropagation();
    setSelectedObjectId(id);
  };

  const handleContextMenu = (e) => {
    e.stopPropagation();
    openContextMenu(e.clientX, e.clientY, id);
  };

  const shapeConfig = SHAPES_MAP[shapeId];
  if (!shapeConfig) {
    console.error(`Shape with shapeId "${shapeId}" not found.`);
    return null;
  }

  const commonProps = {
    name: id,
    onClick: handleObjectClick,
    onContextMenu: handleContextMenu,
    position,
    rotation,
    scale,
  };

  const ModelComponent = shapeConfig.component;
  return <ModelComponent {...commonProps} materialProps={material} />;
};

export default ObjectRenderer;
