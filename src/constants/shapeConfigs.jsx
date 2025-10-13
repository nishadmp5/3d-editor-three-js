import React from "react";
import TableModel from "../components/models/TableModel/TableModel";
import ChairModel from "../components/models/ChairModel/ChairModel";
import { useGLTF } from "@react-three/drei";
import Model from "../components/Model/Model";

// --- PRELOADING MODELS ---
useGLTF.preload('/models/flower.glb');
useGLTF.preload('/models/chair.glb');
useGLTF.preload('/models/table.glb');
useGLTF.preload('/models/stage.gltf');

// An array of available shape configurations.
//  id: A unique machine-readable identifier.
//  name: A readable name for the UI.
//  geometry: The actual R3F geometry component to be rendered.


const defaultMaterial = { color: 'royalblue' };


export const SHAPES = [
  {
    shapeId: "cube",
    name: "Cube",
    type:"primitive",
    image:"/thumbnails/cube.png",
    geometry: <boxGeometry />,
    defaultProps: {
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
    },
  },
  {
    shapeId: "sphere",
    name: "Sphere",
    type:"primitive",
    image:"/thumbnails/sphere.png",
    geometry: <sphereGeometry />,
    defaultProps: {
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
    },
  },
  {
     shapeId: "table",
    name: "Table",
    type:"model",
    image:"/thumbnails/table.png",
    component: (props)=> <Model path={"/models/table.glb"} {...props}/>,
    defaultProps: {
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      scale: [0.5, 0.5, 0.5], 
    },
  },
   {
     shapeId: "chair",
    name: "Chair",
    type:"model",
    image:"/thumbnails/chair.png",
    component: (props)=> <Model path={"/models/chair.glb"} {...props}/>,
    defaultProps: {
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      scale: [1.5, 1.5, 1.5], 
    },
  },
   {
     shapeId: "flower",
    name: "Flower",
    type:"model",
    image:"/thumbnails/flower.png",
    component: (props)=> <Model path={"/models/flower.glb"} {...props}/>,
    defaultProps: {
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      scale: [1.5, 1.5, 1.5], 
    },
  },
   {
     shapeId: "stage",
    name: "Stage",
    type:"model",
    image:"/thumbnails/stage.png",
    component: (props)=> <Model path={"/models/stage.glb"} {...props}/>,
    defaultProps: {
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      scale: [1.5, 1.5, 1.5], 
    },
  }
];

// A map of the shapes, indexed by their ID.
// This is useful for quick lookups instead of searching the array.
// e.g., SHAPES_MAP['cube'] will give you the cube configuration.
export const SHAPES_MAP = SHAPES.reduce((acc, shape) => {
  acc[shape.shapeId] = shape;
  return acc;
}, {});
