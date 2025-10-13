import { create } from "zustand";
import { SHAPES_MAP } from "../constants/shapeConfigs";
import { temporal } from 'zundo';
import { useStoreWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";


const useStore = create(temporal((set) => ({
  // States
  objects: [],
  selectedObjectId: null,
   saveRequest: 0,

  // Actions

  //Action to trigger save request
  triggerSave: () => {
    set((state)=>({ saveRequest: state.saveRequest + 1}))
  },

 // Action to add an object
  addObject: (shapeId) => {
     const shapeConfig = SHAPES_MAP[shapeId];
    if (!shapeConfig) {
      console.error(`Shape type "${shapeId}" not found in shapeConfig.`);
      return; 
    }
    set((state) => ({
      objects: [
        ...state.objects,
        {
          ...shapeConfig.defaultProps,
          id: Date.now(),
          shapeId: shapeId,
          position: [
            (Math.random() - 0.5) * 4, 
            0.5, 
            (Math.random() - 0.5) * 4, 
          ],
          rotation: [0, 0, 0],
          scale: [1, 1, 1],
        },
      ],
    }));
  },

  deleteObject: (id)=> {
    set((state)=>({
      selectedObjectId:null,
      objects: state.objects.filter((obj)=>obj.id !== id)
    }))
  },

  // Action to set the selected object
  setSelectedObjectId: (id)=>{
    set({selectedObjectId:id})
  },

   // Action to update an object's properties (e.g., position)
   updateObjectProperties: (id,newProps)=>{
    set((state)=>({
        objects: state.objects.map((obj)=> obj.id === id ?  { ...obj,...newProps}: obj)
    }))
   }

}),{
  partialize: (state)=> ({objects:state.objects})
}));

const temporalStore = useStore.temporal; 
export const useTemporalStore = (selector, equalityFn = shallow) =>
  useStoreWithEqualityFn(temporalStore, selector, equalityFn);


export default useStore