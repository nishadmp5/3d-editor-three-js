import {
  Environment,
  Grid,
  OrbitControls,
  TransformControls,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useRef } from "react";
import CaptureController from "../../components/CaptureController/CaptureController";
import ObjectRenderer from "../../components/ObjectRenderer/ObjectRenderer";
import useStore from "../../zustandStore/store";
import RoomEnvironment from "../../components/RoomEnvironment/RoomEnvironment";


const Scene = () => {
  // Get state and actions from the store
  const {
    objects,
    selectedObjectId,
    setSelectedObjectId,
    updateObjectProperties,
    addObject,
  } = useStore();

  const sceneRef = useRef();
  const selectedObject = sceneRef.current?.getObjectByName(selectedObjectId);

  const handleTransform = (e) => {
    const newPosition = [
      e.target.object.position.x,
      e.target.object.position.y,
      e.target.object.position.z,
    ];
    // Update the object's position in our central store
    updateObjectProperties(selectedObjectId, { position: newPosition });
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();

    const shapeId = event.dataTransfer.getData("text/plain");

    if (shapeId) {
      addObject(shapeId);
    }
  };

  return (
    // The Canvas component takes up the full space of its container div
    <div
      className="w-full h-full"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <Canvas
        gl={{ preserveDrawingBuffer: true }}
        onPointerMissed={() => setSelectedObjectId(null)}
        shadows
        camera={{ position: [0, 1.7, 4], fov: 60 }}
      >
        <scene ref={sceneRef}>
          {/* Set a background color for the scene */}
          <color attach="background" args={["#202025"]} />

          {/* Essential lighting */}
          <ambientLight intensity={0.8} />
          <pointLight position={[0, 3, 0]} intensity={20} castShadow />
          {/* <Environment preset="studio" environmentIntensity={0.5}/> */}
          <directionalLight position={[10, 10, 5]} intensity={0.5} />

          <RoomEnvironment />

          {objects.map((object, index) => (
            <ObjectRenderer key={index} objectProps={object} />
          ))}

          {selectedObjectId && selectedObject && (
            <TransformControls
              object={selectedObject}
              onMouseUp={handleTransform}
            />
          )}
        </scene>
        {/* Camera controls allow user interaction */}
        <OrbitControls
          makeDefault
          target={[0, 1, 0]}
          maxPolarAngle={Math.PI / 2.05}
          minDistance={1}
          maxDistance={4.5}
        />
        <CaptureController />
      </Canvas>
    </div>
  );
};

export default Scene;
