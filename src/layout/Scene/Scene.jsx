import {
  Environment,
  Grid,
  OrbitControls,
  TransformControls
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useRef } from "react";
import CaptureController from "../../components/CaptureController/CaptureController";
import ObjectRenderer from "../../components/ObjectRenderer/ObjectRenderer";
import useStore from "../../zustandStore/store";

const Scene = () => {
  // Get state and actions from the store
  const { objects, selectedObjectId,setSelectedObjectId, updateObjectProperties, addObject } =
    useStore();

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

  const handleDragOver = (event)=> {
    event.preventDefault();
  }

  const handleDrop = (event)=> {
    event.preventDefault(); 

    const shapeId = event.dataTransfer.getData("text/plain");

    if(shapeId){
      addObject(shapeId)
    }
  }

  return (
    // The Canvas component takes up the full space of its container div
    <div className="w-full h-full" onDragOver={handleDragOver} onDrop={handleDrop}>
      <Canvas  gl={{ preserveDrawingBuffer: true }}  onPointerMissed={() => setSelectedObjectId(null)} shadows camera={{ position: [5, 5, 5], fov: 50 }}>
        <scene ref={sceneRef}>
          {/* Set a background color for the scene */}
          <color attach="background" args={["#202025"]} />

          {/* Essential lighting */}
          <ambientLight intensity={2} color={"ffffff"}/>
          {/* <Environment preset="studio" environmentIntensity={0.5}/> */}
          <directionalLight
            position={[10, 10, 5]}
            intensity={2.5}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />

          {objects.map((object, index) => (
            <ObjectRenderer key={index} objectProps={object} />
          ))}

          {selectedObjectId && selectedObject && (
            <TransformControls
              object={selectedObject}
              onMouseUp={handleTransform}
            />
          )}

          {/* A grid helper for perspective */}
          {/* <Grid infiniteGrid sectionColor={"#505050"} /> */}
        </scene>
        {/* Camera controls allow user interaction */}
        <OrbitControls makeDefault />
        <CaptureController/>
      </Canvas>
    </div>
  );
};

export default Scene;
