import { create } from "zustand";

export const useRoomStore = create((set) => ({
  //  Room settings related states
  roomSettings: {
    wallTextureId: "default",
    floorTextureId: "default",
    roomBrightness: 0.8,
  },

  // Actions on room settings
  setWallTexture: (textureId) => {
    set((state) => ({
      roomSettings: { ...state.roomSettings, wallTextureId: textureId },
    }));
  },

  setFloorTexture: (textureId) => {
    set((state) => ({
      roomSettings: { ...state.roomSettings, floorTextureId: textureId },
    }));
  },

  setBrightness: (value) => {
    set((state) => ({
      roomSettings: { ...state.roomSettings, roomBrightness: value },
    }));
  },
}));
