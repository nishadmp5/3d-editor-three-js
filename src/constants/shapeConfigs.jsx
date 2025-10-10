import React from "react";

// An array of available shape configurations.
//  id: A unique machine-readable identifier.
//  name: A readable name for the UI.
//  geometry: The actual R3F geometry component to be rendered.

export const SHAPES = [
  {
    shapeId: "cube",
    name: "Cube",
    geometry: <boxGeometry />,
    defaultProps: {
      position: [0, 0.5, 0],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
    },
  },
  {
    shapeId: "sphere",
    name: "Sphere",
    geometry: <sphereGeometry />,
    defaultProps: {
      position: [0, 0.7, 0],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
    },
  },
  {
    shapeId: "torus",
    name: "Torus",
    geometry: <torusGeometry args={[0.5, 0.2, 16, 100]} />,
    defaultProps: {
      position: [0, 0.5, 0],
      rotation: [Math.PI / 2, 0, 0],
      scale: [1, 1, 1],
    },
  },
  {
    shapeId: "plane",
    name: "Plane",
    geometry: <planeGeometry />,
    defaultProps: {
      position: [0, 0, 0],
      rotation: [-Math.PI / 2, 0, 0],
      scale: [1, 1, 1],
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
