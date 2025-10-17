import { useGLTF } from "@react-three/drei";
import Model from "../components/Model/Model";

// --- PRELOADING MODELS ---
useGLTF.preload("/models/room.glb");
useGLTF.preload("/models/flower.glb");
useGLTF.preload("/models/chair-wood.glb");
useGLTF.preload("/models/table.glb");
useGLTF.preload("/models/stage.gltf");
useGLTF.preload("/models/bed-wood.glb");
useGLTF.preload("/models/bed-leather.glb");
useGLTF.preload("/models/gaming-pc.glb");

// An array of available shape configurations.
//  id: A unique machine-readable identifier.
//  name: A readable name for the UI.
//  geometry: The actual R3F geometry component to be rendered.

export const CEILING_HEIGHT = 3.5;

export const SHAPES = [
  {
    shapeId: "table",
    name: "Table",
    category: "furniture",
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
      scaleFactor: 0.175,
      transformMode: "translate",
      axisVisibility: {
        translate: { showX: true, showY: false, showZ: true },
        rotate: { showX: false, showY: true, showZ: false },
      },
    },
  },
  {
    shapeId: "bed-wood",
    name: "Wooden Bed",
    category: "furniture",
    type: "model",
    image: "/thumbnails/bed-wood.png",
    component: (props) => <Model path={"/models/bed-wood.glb"} {...props} />,
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
      scaleFactor: 1.05,
      transformMode: "translate",
      axisVisibility: {
        translate: { showX: true, showY: false, showZ: true },
        rotate: { showX: false, showY: true, showZ: false },
      },
    },
  },
  {
    shapeId: "bed-leather",
    name: "Leather Bed",
    category: "furniture",
    type: "model",
    image: "/thumbnails/bed-leather.png",
    component: (props) => <Model path={"/models/bed-leather.glb"} {...props} />,
    availableTextures: [
      { name: "Default", path: null },
      { name: "Wood1", path: "/textures/wood/wood-1.jpg" },
      { name: "Wood2", path: "/textures/wood/wood-2.jpg" },
      { name: "Wood3", path: "/textures/wood/wood-3.jpg" },
    ],
    defaultProps: {
      position: [0, 0.2, 0],
      rotation: [0, 0, 0],
      material: { texture: null },
      scaleFactor: 1,
       transformMode: "translate",
      axisVisibility: {
        translate: { showX: true, showY: false, showZ: true },
        rotate: { showX: false, showY: true, showZ: false },
      },
    },
  },
  {
    shapeId: "gaming-pc",
    name: "Gaming PC",
    category: "electronics",
    type: "model",
    image: "/thumbnails/gaming-pc.png",
    component: (props) => <Model path={"/models/gaming-pc.glb"} {...props} />,
    availableTextures: [
      { name: "Default", path: null },
      { name: "Wood1", path: "/textures/wood/wood-1.jpg" },
      { name: "Wood2", path: "/textures/wood/wood-2.jpg" },
      { name: "Wood3", path: "/textures/wood/wood-3.jpg" },
    ],
    defaultProps: {
      position: [0, 0.2, 0],
      rotation: [0, 0, 0],
      material: { texture: null },
      scaleFactor: 0.1,
      transformMode: "translate",
      axisVisibility: {
        translate: { showX: true, showY: true, showZ: true },
        rotate: { showX: false, showY: true, showZ: false },
      },
    },
  },
  {
    shapeId: "chair-wood",
    name: "Wooden Chair",
    category: "furniture",
    type: "model",
    image: "/thumbnails/chair-wood.png",
    component: (props) => <Model path={"/models/chair-wood.glb"} {...props} />,
    availableTextures: [
      { name: "Default", path: null },
      { name: "Wood1", path: "/textures/wood/wood-1.jpg" },
      { name: "Wood2", path: "/textures/wood/wood-2.jpg" },
      { name: "Wood3", path: "/textures/wood/wood-3.jpg" },
    ],
    defaultProps: {
      position: [0, 0.23, 0],
      rotation: [0, 0, 0],
      scaleFactor: 2.5,
      material: { texture: null },
       transformMode: "translate",
      axisVisibility: {
        translate: { showX: true, showY: false, showZ: true },
        rotate: { showX: false, showY: true, showZ: false },
      },
    },
  },
  {
    shapeId: "flower",
    name: "Flower",
    category: "decorative",
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
      position: [0, 0.5, 0],
      rotation: [0, 0, 0],
      material: { texture: null },
      scaleFactor: 0.4,
      transformMode: "translate",
      axisVisibility: {
        translate: { showX: true, showY: true, showZ: true },
        rotate: { showX: false, showY: true, showZ: false },
      },
    },
  },
];

// A map of the shapes, indexed by their ID.
// This is useful for quick lookups instead of searching the array.
// e.g., SHAPES_MAP['cube'] will give you the cube configuration.
export const SHAPES_MAP = SHAPES.reduce((acc, shape) => {
  acc[shape.shapeId] = shape;
  return acc;
}, {});
