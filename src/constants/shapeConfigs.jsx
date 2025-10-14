import { useGLTF } from "@react-three/drei";
import Model from "../components/Model/Model";

// --- PRELOADING MODELS ---
useGLTF.preload("/models/flower.glb");
useGLTF.preload("/models/chair.glb");
useGLTF.preload("/models/table.glb");
useGLTF.preload("/models/stage.gltf");

// An array of available shape configurations.
//  id: A unique machine-readable identifier.
//  name: A readable name for the UI.
//  geometry: The actual R3F geometry component to be rendered.


export const SHAPES = [
  {
    shapeId: "table",
    name: "Table",
    type: "model",
    image: "/thumbnails/table.png",
    component: (props) => <Model path={"/models/table.glb"} {...props} />,
    availableTextures: [
      { name: "Default", path: null },
      { name: "Wood1", path: "/textures/wood/wood-1.jpg" },
      { name: "Wood2", path: "/textures/wood/wood-2.jpg" },
      { name: "Wood3", path: "/textures/wood/wood-3.jpg" },
    ],
    defaultProps: {
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      material: { texture: null },
      scaleFactor: 0.3,
      constraint:"floor"
    },
  },
  {
    shapeId: "chair",
    name: "Chair",
    type: "model",
    image: "/thumbnails/chair.png",
    component: (props) => <Model path={"/models/chair.glb"} {...props} />,
    availableTextures: [
      { name: "Default", path: null },
      { name: "Wood1", path: "/textures/wood/wood-1.jpg" },
      { name: "Wood2", path: "/textures/wood/wood-2.jpg" },
      { name: "Wood3", path: "/textures/wood/wood-3.jpg" },
    ],
    defaultProps: {
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      scaleFactor:1.5,
      material: { texture: null },
      constraint:"ceiling",
    },
  },
  {
    shapeId: "flower",
    name: "Flower",
    type: "model",
    image: "/thumbnails/flower.png",
    component: (props) => <Model path={"/models/flower.glb"} {...props} />,
    availableTextures: [
      { name: "Default", path: null },
      { name: "Wood1", path: "/textures/wood/wood-1.jpg" },
      { name: "Wood2", path: "/textures/wood/wood-2.jpg" },
      { name: "Wood3", path: "/textures/wood/wood-3.jpg" },
    ],
    defaultProps: {
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      material: { texture: null },
      scaleFactor: 2,
      constraint:"wall"
    },
  },
  // {
  //   shapeId: "stage",
  //   name: "Stage",
  //   type: "model",
  //   image: "/thumbnails/stage.png",
  //   component: (props) => <Model path={"/models/stage.glb"} {...props} />,
  //   availableTextures: [
  //     { name: "Default", path: null },
  //     { name: "Wood1", path: "/textures/wood/wood-1.jpg" },
  //     { name: "Wood2", path: "/textures/wood/wood-2.jpg" },
  //     { name: "Wood3", path: "/textures/wood/wood-3.jpg" },
  //   ],
  //   defaultProps: {
  //     position: [0, 0, 0],
  //     rotation: [0, 0, 0],
  //     scaleFactor: 0.3,
  //     material: { texture: null },
  //   },
  // },
];

// A map of the shapes, indexed by their ID.
// This is useful for quick lookups instead of searching the array.
// e.g., SHAPES_MAP['cube'] will give you the cube configuration.
export const SHAPES_MAP = SHAPES.reduce((acc, shape) => {
  acc[shape.shapeId] = shape;
  return acc;
}, {});
