import { create } from "zustand";
import { SHAPES_MAP } from "../constants/shapeConfigs";
import { temporal } from "zundo";
import { useStoreWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";

const useObjectsStore = create(
  temporal(
    (set) => ({
      // States
      objects: [],
      selectedObjectId: null,

      // Action to add an object
      addObject: (shapeId) => {
        const shapeConfig = SHAPES_MAP[shapeId];
        if (!shapeConfig) {
          console.error(`Shape type "${shapeId}" not found in shapeConfig.`);
          return;
        }
        const scaleFactor = shapeConfig.defaultProps.scaleFactor || 1;
        set((state) => ({
          objects: [
            ...state.objects,
            {
              ...shapeConfig.defaultProps,
              id: Date.now(),
              shapeId: shapeId,
              scale: [scaleFactor, scaleFactor, scaleFactor],
            },
          ],
        }));
      },

      duplicateObject: (parentId) => {
        set((state) => {
          const parentShapeConfig = state.objects.find(
            (obj) => obj.id === parentId
          );
          if (!parentShapeConfig) {
            console.error(
              `object with  "${parentId}" not found in Objects list.`
            );
            return state;
          }

          const duplicatedObject = {
            ...parentShapeConfig,
            id: Date.now(),
            position: [
              parentShapeConfig.position[0] + (0.5 +Math.random()),
              parentShapeConfig.position[1],
              parentShapeConfig.position[2] + (0.5+Math.random()),
            ],
          };

          return {
            objects: [...state.objects, duplicatedObject],
          };
        });
      },

      deleteObject: (id) => {
        set((state) => ({
          selectedObjectId: null,
          objects: state.objects.filter((obj) => obj.id !== id),
        }));
      },

      // Action to set the selected object
      setSelectedObjectId: (id) => {
        set({ selectedObjectId: id });
      },

      // Action to update an object's properties (e.g., position)
      updateObjectProperties: (id, newProps) => {
        set((state) => ({
          objects: state.objects.map((obj) =>
            obj.id === id ? { ...obj, ...newProps } : obj
          ),
        }));
      },

    }),
    {
      partialize: (state) => ({ objects: state.objects }),
    }
  )
);

const temporalStore = useObjectsStore.temporal;
export const useTemporalStore = (selector, equalityFn = shallow) =>
  useStoreWithEqualityFn(temporalStore, selector, equalityFn);

export default useObjectsStore;
