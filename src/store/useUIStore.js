import { create } from "zustand";

export const useUIStore = create((set)=>({
    // projectName  states
      projectName: "My Room in 3D",

      // Action to set projectName
      setProjectName: (name) => {
        set(() => ({ projectName: name }));
      },

      
      //  Context Menu state
      contextMenu: {
        visible: false,
        x: 0,
        y: 0,
        targetId: null,
      },

      //  Context Menu Actions
      openContextMenu: (x, y, targetId) => {
        set({
          contextMenu: { visible: true, x, y, targetId },
          selectedObjectId: targetId,
        });
      },

      closeContextMenu: () => {
        set((state) => ({
          contextMenu: { ...state.contextMenu, visible: false },
        }));
      },
}))