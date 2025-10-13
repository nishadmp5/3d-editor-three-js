import React from "react";
import { FaUndo, FaRedo, FaSave } from "react-icons/fa"; // Example icons
import useStore, { useTemporalStore } from "../../zustandStore/store";

const Topbar = () => {
  const triggerSave = useStore((state) => state.triggerSave);

  const { undo, redo, pastStates, futureStates } = useTemporalStore((state) => ({
    undo: state.undo,
    redo: state.redo,
    pastStates: state.pastStates,
    futureStates: state.futureStates,
  }));

  const canUndo = pastStates.length > 0;
  const canRedo = futureStates.length > 0;

  return (
    <div className="w-full h-12 bg-gray-800 text-white flex items-center justify-between px-4 shadow-md">
      {/* Left Section: Logo and Menu */}
      <div className="flex items-center gap-x-6">
        <h1 className="text-xl font-bold">3D Editor</h1>
        <div className="flex items-center gap-x-4">
          <button className="hover:bg-gray-700 px-2 py-1 rounded">File</button>
          <button className="hover:bg-gray-700 px-2 py-1 rounded">Edit</button>
          <button className="hover:bg-gray-700 px-2 py-1 rounded">View</button>
        </div>
      </div>

      {/* Right Section: Action Icons */}
      <div className="flex items-center gap-x-4">
        <button
          className="hover:bg-gray-700 p-2 rounded-full"
          title="Undo"
          disabled={!canUndo}
          onClick={() => undo()}
        >
          <FaUndo />
        </button>
        <button
          className="hover:bg-gray-700 p-2 rounded-full"
          title="Redo"
          disabled={!canRedo}
          onClick={() => redo()}
        >
          <FaRedo />
        </button>
        <button
          onClick={triggerSave}
          title="Save as Image"
          className="bg-blue-600 hover:bg-blue-700 p-2 rounded-full"
        >
          <FaSave />
        </button>
      </div>
    </div>
  );
};

export default Topbar;
