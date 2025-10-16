import React, { useEffect, useRef, useState } from "react";
import useStore from "../../zustandStore/store";
import { ChevronDownIcon } from "../Icons/Icons";

const SaveButton = () => {
  const { triggerSave } = useStore();

  const [isSaveMenuOpen, setIsSaveMenuOpen] = useState(false);
  const saveMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (saveMenuRef.current && !saveMenuRef.current.contains(event.target)) {
        setIsSaveMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSaveOptionClick = (option) => {
    triggerSave(option);
    setIsSaveMenuOpen(false);
  };

  const saveOptions = ["top", "left", "right", "rear", "back", "3D"];

  return (
    <div ref={saveMenuRef} className="relative">
      <button
        type="button"
        className="flex items-center gap-2 bg-gray-800 text-white font-semibold text-sm px-5 py-2.5 rounded-md hover:bg-gray-700 transition-colors"
        onClick={() => setIsSaveMenuOpen((prev) => !prev)}
        title="Save as Image"
      >
        Save
        <ChevronDownIcon dark={false} />
      </button>

      {/* Dropdown Menu */}
      {isSaveMenuOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50 py-1">
          <ul>
            {saveOptions.map((option) => (
              <li key={option}>
                <button
                  onClick={() => handleSaveOptionClick(option)}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Save from {option} view
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SaveButton;
