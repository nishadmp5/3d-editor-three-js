import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import * as THREE from "three";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";
import { useActivityStore } from "../../store/useActivityStore";
import { useUIStore } from "../../store/useUIStore";

const saveArrayBuffer = (buffer, filename) => {
  const blob = new Blob([buffer], { type: "application/octet-stream" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
};

const CaptureController = () => {
  const { gl, scene, camera } = useThree();
  const { saveRequest, saveOption } = useActivityStore();
  const { projectName } = useUIStore()

  useEffect(() => {
    if (saveRequest === 0) return;

    const safeProjectName = projectName.replace(/ /g, "_") || "scene";

    //  CASE 1:  3D FILE EXPORT 
    if (saveOption === "3D") {
      const exporter = new GLTFExporter();

      const exportScene = new THREE.Scene();

      scene.traverse((object) => {
        // This  ignores Lights, Helpers, Cameras, and the TransformControls gizmo.
        if (object.isMesh || object.isGroup || object.isScene) {
          // We must clone the object, otherwise we modify the live scene
          exportScene.add(object.clone());
        }
      });

      const options = {
        binary: true,
        trs: true,
        onlyVisible: true,
      };

      exporter.parse(
        exportScene,
        (result) => {
          const filename = `${safeProjectName}.glb`;
          saveArrayBuffer(result, filename);
        },
        (error) => {
          console.error("An error occurred during GLB export:", error);
        },
        options
      );

      return;
    }

    //  CASE 2:  2D IMAGE EXPORT OF CURRENT USER VIEW  
    if (saveOption === "current") {
      const dataUrl = gl.domElement.toDataURL("image/png");
      
      const link = document.createElement("a");
      link.download = `${safeProjectName}_current_view.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      return; 
    }

    //  CASE 3:  2D IMAGE EXPORT All other cases 
    const width = 10;
    const height = 10;

    const viewCamera = new THREE.OrthographicCamera(
      width / -2,
      width / 2,
      height / 2,
      height / -2,
      0.1,
      100
    );

    switch (saveOption) {
      case "top":
        viewCamera.position.set(0, 3, 0);
        break;
      case "rear":
        viewCamera.position.set(0, 0, 3);
        break;
      case "back":
        viewCamera.position.set(0, 0, -3);
        break;
      case "left":
        viewCamera.position.set(-3, 0, 0);
        break;
      case "right":
        viewCamera.position.set(3, 0, 0);
        break;
      default:
        viewCamera.position.set(0, 3, 0);
    }
    viewCamera.lookAt(0, 0, 0);
    viewCamera.updateProjectionMatrix();

    // --- 2. Render the scene with the new camera ---
    // This forces a single frame render using our camera.
    // The user might see a brief flash of this view.
    gl.render(scene, viewCamera);

    const dataUrl = gl.domElement.toDataURL("image/png");

    const link = document.createElement("a");
    link.download = `${projectName}_${saveOption}_view.png`;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [saveRequest, gl, scene, camera, projectName]);
  return null;
};

export default CaptureController;
