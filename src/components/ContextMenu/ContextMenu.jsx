import React from 'react';
import useStore from '../../zustandStore/store';
import { SHAPES_MAP } from '../../constants/shapeConfigs';

const ContextMenu = () => {
  const { contextMenu, closeContextMenu, updateObjectProperties } = useStore();
  const targetObject = useStore((state) =>
    state.objects.find((obj) => obj.id === state.contextMenu.targetId)
  );

  if (!contextMenu.visible || !targetObject) {
    return null;
  }

  const shapeConfig = SHAPES_MAP[targetObject.shapeId];

  const handleOptionClick = (newMaterialProps) => {
    updateObjectProperties(targetObject.id, { material: { ...targetObject.material, ...newMaterialProps } });
    closeContextMenu();
  };

  return (
    <>
      {/* Overlay to catch clicks outside the menu */}
      <div className="fixed inset-0 z-40" onClick={closeContextMenu} />
      
      <div
        className="fixed bg-white rounded-md shadow-lg p-2 z-50 border border-gray-200"
        style={{ top: `${contextMenu.y}px`, left: `${contextMenu.x}px` }}
      >
        <ul className="text-sm text-gray-700">
          {shapeConfig.availableTextures?.map((texture) => (
            <li
              key={texture.name}
              onClick={() => handleOptionClick({ texture: texture.path })}
              className="px-3 py-1 hover:bg-gray-100 rounded-sm cursor-pointer"
            >
              {texture.name}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ContextMenu;