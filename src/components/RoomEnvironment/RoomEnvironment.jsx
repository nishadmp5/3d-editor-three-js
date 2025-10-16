import { useGLTF } from "@react-three/drei";
import React, { useEffect, useMemo, useRef } from "react";
import useStore from "../../zustandStore/store";
import { ROOM_TEXTURE_MAP } from "../../constants/shapeConfigs";
import * as THREE from "three";


const RoomEnvironment = () => {
  const { scene } = useGLTF("/models/room.glb");
  const clonedScene = useMemo(() => scene.clone(), [scene]);
  const originalMaterials = useRef({});

  const { wallTexture: wallTextureId, floorTexture: floorTextureId } = useStore((state) => state.roomSettings);

  const wallTexturePath = ROOM_TEXTURE_MAP[wallTextureId];
  const floorTexturePath = ROOM_TEXTURE_MAP[floorTextureId];
  


   useEffect(() => {
    clonedScene.traverse((child) => {
      if (child.isMesh) {
        originalMaterials.current[child.uuid] = child.material;
        child.receiveShadow = true;
      }
    });
  }, [clonedScene]);
    
  useEffect(() => {
      if (wallTexturePath) {
        
        const loader = new THREE.TextureLoader();
        loader.load(wallTexturePath, (texture) => {
          texture.flipY = false;
          texture.encoding = THREE.sRGBEncoding;
          const mesh = clonedScene.getObjectByName('Cube_Wall_0')
          if(mesh){
            mesh.material = mesh.material.clone();
              mesh.material.map = texture;
              mesh.material.color.set("white");
              mesh.material.needsUpdate = true;
          }
        });
      } else {
         const mesh = clonedScene.getObjectByName('Cube_Wall_0')
         if(mesh && originalMaterials.current[mesh.uuid]){
          mesh.material = originalMaterials.current[mesh.uuid];
         }
      }

      if (floorTexturePath) {
        const loader = new THREE.TextureLoader();
        loader.load(floorTexturePath, (texture) => {
          texture.flipY = false;
          texture.encoding = THREE.sRGBEncoding;
          const mesh = clonedScene.getObjectByName('Cube_Floor_0')
          if(mesh){
            mesh.material = mesh.material.clone();
              mesh.material.map = texture;
              mesh.material.color.set("white");
              mesh.material.needsUpdate = true;
          }
        });
      } else {
         const mesh = clonedScene.getObjectByName('Cube_Floor_0')
         if(mesh && originalMaterials.current[mesh.uuid]){
          mesh.material = originalMaterials.current[mesh.uuid];
         }
      }
    }, [clonedScene, wallTexturePath,floorTexturePath]);

  return <primitive object={clonedScene} />;
};

useGLTF.preload('/models/room.glb');


export default RoomEnvironment;


// Cube_Wall_0

// Cube_Floor_0