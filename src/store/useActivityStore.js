import { create } from "zustand";

export const useActivityStore = create((set) => ({
  //  Saving related states
  saveRequest: 0,
  saveOption: "top",

  //Action to trigger save request
  triggerSave: (option) => {
    set((state) => ({
      saveRequest: state.saveRequest + 1,
      saveOption: option,
    }));
  },

  // Keyboard controls states
  lastEditedProperty: {
    property: null,
    axis: null,
  },

  setLastEditedProperty: (property, axis) => {
    set({ lastEditedProperty: { property, axis } });
  },
}));
