import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import ApplyTexture from "../ApplyTexture/ApplyTexture";
import * as THREE from "three";

const Model = ({ path, materialProps, ...props }) => {
  const { scene } = useGLTF(path);
  const originalMaterials = useRef({});

  const clonedScene = useMemo(() => scene.clone(), [scene]);

  const texturePath = materialProps?.texture;

  useEffect(() => {
    clonedScene.traverse((child) => {
      if (child.isMesh) {
        originalMaterials.current[child.uuid] = child.material;
        child.castShadow = true;
      }
    });
  }, [clonedScene]);

  useEffect(() => {
    if (texturePath) {
      const loader = new THREE.TextureLoader();
      loader.load(texturePath, (texture) => {
        texture.flipY = false;
        texture.encoding = THREE.sRGBEncoding;
        clonedScene.traverse((child) => {
          if (child.isMesh) {
            child.material = child.material.clone();
            child.material.map = texture;
            child.material.color.set("white");
            child.material.needsUpdate = true;
          }
        });
      });
    } else {
      clonedScene.traverse((child) => {
        if (child.isMesh && originalMaterials.current[child.uuid]) {
          child.material = originalMaterials.current[child.uuid];
        }
      });
    }
  }, [clonedScene, texturePath]);

  return <primitive object={clonedScene} {...props} />;
};

export default Model;
