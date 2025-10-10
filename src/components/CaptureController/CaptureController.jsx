import { useThree } from "@react-three/fiber";
import React, { useEffect } from "react";
import useStore from "../../zustandStore/store";
import * as THREE from "three";

const CaptureController = () => {
  const { gl, scene } = useThree();
  const saveRequest = useStore((state) => state.saveRequest);

  useEffect(() => {
    if (saveRequest === 0) return;

    const width = 10;
    const height = 10;

    const topViewCamera = new THREE.OrthographicCamera(
      width / -2,
      width / 2,
      height / 2,
      height / -2,
      0.1,
      100
    );
    topViewCamera.position.set(0, 10, 0);
    topViewCamera.lookAt(0, 0, 0);
    topViewCamera.updateProjectionMatrix();

    // --- 2. Render the scene with the new camera ---
    // This forces a single frame render using our top-down camera.
    // The user might see a brief flash of this view.
    gl.render(scene, topViewCamera);

    const dataUrl = gl.domElement.toDataURL("image/png");

    const link = document.createElement("a");
    link.download = "model-view-2d.png"
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

  }, [saveRequest,gl,scene]);
  return null;
};

export default CaptureController;
