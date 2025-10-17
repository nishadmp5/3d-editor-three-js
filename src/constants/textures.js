export const WALL_TEXTURE_OPTIONS = [
  { id: "default", name: "Default", path: null },

  { id: "wood1", name: "Wood1", path: "/textures/wood/wood-1.jpg" },

  { id: "wood2", name: "Wood2", path: "/textures/wood/wood-2.jpg" },

  { id: "wood3", name: "Wood3", path: "/textures/wood/wood-3.jpg" },
];

export const WALL_TEXTURE_MAP = WALL_TEXTURE_OPTIONS.reduce(
  (acc, t) => ({ ...acc, [t.id]: t.path }),
  {}
);

export const FLOOR_TEXTURE_OPTIONS = [
  { id: "default", name: "Default", path: null },

  { id: "wood1", name: "Wood1", path: "/textures/wood/wood-1.jpg" },

  { id: "wood2", name: "Wood2", path: "/textures/wood/wood-2.jpg" },

  { id: "wood3", name: "Wood3", path: "/textures/wood/wood-3.jpg" },
];

export const FLOOR_TEXTURE_MAP = FLOOR_TEXTURE_OPTIONS.reduce(
  (acc, t) => ({ ...acc, [t.id]: t.path }),
  {}
);
