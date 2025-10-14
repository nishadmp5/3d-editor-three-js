import { useGLTF } from "@react-three/drei";
import React, { useEffect } from "react";

const RoomEnvironment = () => {
  const { scene } = useGLTF("/models/room.glb");

    
  useEffect(() => {
    
    scene.traverse((child) => {
      if (child.isMesh) {
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  return <primitive object={scene} />;
};

useGLTF.preload('/models/room.glb');


export default RoomEnvironment;


