import {
  Environment,
  OrbitControls,
  TransformControls
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useRef } from "react";
import CaptureController from "../../components/CaptureController/CaptureController";
import ObjectRenderer from "../../components/ObjectRenderer/ObjectRenderer";
import RoomEnvironment from "../../components/RoomEnvironment/RoomEnvironment";
import useStore from "../../zustandStore/store";


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
  const selectedObjectConfig = objects.find((obj)=> obj.id === selectedObjectId)


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
          <color attach="background" args={["#202025"]} />

          <ambientLight intensity={0.8} />
          <pointLight position={[0, 3, 0]} intensity={20} castShadow />
          <Environment preset="apartment" environmentIntensity={0.5}/>
          {/* <directionalLight position={[10, 10, 5]} intensity={0.5} /> */}

          <RoomEnvironment />

          {objects.map((object, index) => (
            <ObjectRenderer key={index} objectProps={object} />
          ))}

          {selectedObjectId && selectedObject && (
            <TransformControls
            showX={selectedObjectConfig.showX}
            showY={selectedObjectConfig.showY}
            showZ={selectedObjectConfig.showZ}
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
          maxDistance={4.25}
        />
        <CaptureController />
      </Canvas>
    </div>
  );
};

export default Scene;
