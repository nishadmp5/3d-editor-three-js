import React from 'react';
import { FaUndo, FaRedo, FaSave } from 'react-icons/fa'; // Example icons
import useStore from '../../zustandStore/store';

const Topbar = () => {

  const triggerSave = useStore((state)=> state.triggerSave);

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
        <button className="hover:bg-gray-700 p-2 rounded-full" title="Undo">
          <FaUndo />
        </button>
        <button className="hover:bg-gray-700 p-2 rounded-full" title="Redo">
          <FaRedo />
        </button>
        <button onClick={triggerSave} title="Save as Image" className="bg-blue-600 hover:bg-blue-700 p-2 rounded-full">
          <FaSave />
        </button>
      </div>
    </div>
  );
};

export default Topbar;