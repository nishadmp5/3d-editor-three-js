import { useTexture } from "@react-three/drei";
import { useEffect } from "react";
import * as THREE from "three";


const ApplyTexture = ({ scene, texturePath }) => {
  const texture = useTexture(texturePath);

  texture.flipY = false;
  texture.encoding = THREE.sRGBEncoding;

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material = child.material.clone();
        child.material.map = texture;
         child.material.color.set('white'); 
        child.material.needsUpdate = true;
      }
    });
  }, [scene, texture]);

  return null;
};

export default ApplyTexture;


// it works,but there is an issue  such that there is a delay in appearing of object when we chaniging the texture until we select that texture on time ,for example if i select texture wood-2 for first time ,there delay but when go back to default and select again then there is no issue