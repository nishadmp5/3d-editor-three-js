import React from 'react';
import useStore from '../../zustandStore/store';
import { SHAPES_MAP } from '../../constants/shapeConfigs';
import { RocketIcon } from '../Icons/Icons';



const TextureListing = () => {
  const { selectedObjectId, updateObjectProperties } = useStore();
  
  const selectedObject = useStore((state) =>
    state.objects.find((obj) => obj.id === selectedObjectId)
  );

  if (!selectedObject) {
    return (
      <div className="p-4">
        <h3 className="flex items-center gap-x-2 text-lg font-bold text-gray-900 mb-4">
            <RocketIcon />
            <span>Texture Catalogue</span>
        </h3>
        <p className="text-sm text-gray-500 italic">Select an object to see available textures.</p>
      </div>
    );
  }

  const shapeConfig = SHAPES_MAP[selectedObject.shapeId];
  
  const availableTextures = shapeConfig.availableTextures?.filter(texture => texture.path) || [];

  const handleTextureSelect = (texturePath) => {
    updateObjectProperties(selectedObject.id, { 
      material: { ...selectedObject.material, texture: texturePath } 
    });
  };

  return (
    <div className="p-4">
      <h3 className="flex items-center gap-x-2 text-lg font-bold text-gray-900 mb-4">
        <RocketIcon />
        <span>Texture Catalogue</span>
      </h3>
      
      {availableTextures.length > 0 ? (
        <div className="grid grid-cols-2 gap-3">
          {availableTextures.map((texture) => (
            <button
              key={texture.name}
              onClick={() => handleTextureSelect(texture.path)}
              className="group aspect-square w-full rounded-md overflow-hidden border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:border-blue-500 transition-all"
              title={`Apply ${texture.name} texture`}
            >
              <img
                src={texture.path}
                alt={texture.name}
                className="w-full h-full object-cover pointer-events-none"
              />
            </button>
          ))}
        </div>
      ) : (
         <p className="text-sm text-gray-500 italic">No textures available for the selected object.</p>
      )}
    </div>
  );
};

export default TextureListing;