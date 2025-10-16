import {
  Environment,
  OrbitControls,
  TransformControls
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useRef } from "react";
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
    setLastEditedProperty,
    roomSettings,
  } = useStore();
  
  const sceneRef = useRef();
  const selectedObject = sceneRef.current?.getObjectByName(selectedObjectId);
  const selectedObjectConfig = objects.find((obj)=> obj.id === selectedObjectId)

  const handleGizmoMouseDown = (event)=> {
    const axis =  event.target.axis;
    if(!axis) return

    const property = selectedObjectConfig.transformMode === "rotate" ? "rotation" : "position"
    const axisMap = { X:0, Y:1, Z:2}
    
    setLastEditedProperty(property,axisMap[axis])
  }

  const handleTransform = (e) => {
    const newPosition = [
      e.target.object.position.x,
      e.target.object.position.y,
      e.target.object.position.z,
    ];
     const newRotation = [
      e.target.object.rotation.x,
      e.target.object.rotation.y,
      e.target.object.rotation.z,
    ];
    updateObjectProperties(selectedObjectId, { position: newPosition,rotation:newRotation });
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

  useEffect(()=>{
    const handleKeyDown = (event)=>{
      const { selectedObjectId, lastEditedProperty, objects, updateObjectProperties } = useStore.getState();

      if(!selectedObjectId && !lastEditedProperty.property) return;
      if(event.key !== "ArrowUp" && event.key !== "ArrowDown") return;

      event.preventDefault();

      const selectedObject = objects.find((obj)=> obj.id === selectedObjectId);
      if(!selectedObject) return;

      const { property,axis } = lastEditedProperty;

      let increment = event.key === "ArrowUp" ? 0.1 : -0.1;
      if (property === 'rotation') {
        increment = event.key === 'ArrowUp' ? (1 * Math.PI / 180) : (-1 * Math.PI / 180);
      }

      const newValues = [...selectedObject[property]];
      newValues[axis] = parseFloat((newValues[axis] + increment).toFixed(4));

      updateObjectProperties(selectedObjectId,{[property]: newValues})
    }

    window.addEventListener("keydown",handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  },[])

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

          <ambientLight intensity={1.5} />
          <pointLight position={[0, 3, 0]} intensity={20} castShadow />
          <Environment preset="apartment" environmentIntensity={roomSettings.roomBrightness * 0.5} />

          {/* <directionalLight position={[10, 10, 5]} intensity={0.5} /> */}

          <RoomEnvironment />

          {objects.map((object, index) => (
            <ObjectRenderer key={index} objectProps={object} />
          ))}

          {selectedObjectId && selectedObject && (
            <TransformControls
            mode={selectedObjectConfig.transformMode}
            showX={selectedObjectConfig.axisVisibility[selectedObjectConfig.transformMode].showX}
            showY={selectedObjectConfig.axisVisibility[selectedObjectConfig.transformMode].showY}
            showZ={selectedObjectConfig.axisVisibility[selectedObjectConfig.transformMode].showZ}
              object={selectedObject}
              onMouseUp={handleTransform}
              onMouseDown={handleGizmoMouseDown}
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
