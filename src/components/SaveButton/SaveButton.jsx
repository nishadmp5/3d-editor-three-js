import { useEffect, useRef, useState } from "react";
import { useActivityStore } from "../../store/useActivityStore";

const SaveButton = () => {
  const { triggerSave } = useActivityStore();
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

  const saveOptions = [
    { id: "current", label: "from Current View" },
    { id: "3D", label: "as 3D Model" },
    { id: "top", label: "from Top View" },
    { id: "front", label: "from Front View" }, 
    { id: "back", label: "from Back View" },
    { id: "left", label: "from Left View" },
    { id: "right", label: "from Right View" },
  ];

  return (
    <div ref={saveMenuRef} className="relative">
      <button
        type="button"
        className="flex items-center gap-2 bg-gray-800 text-white font-semibold text-sm px-5 py-2.5 rounded-md hover:bg-gray-700 transition-colors"
        onClick={() => setIsSaveMenuOpen((prev) => !prev)}
        title="Save as Image"
      >
        Save
      </button>

      {/* Dropdown Menu */}
      {isSaveMenuOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50 py-1">
          <ul>
            {saveOptions.map((option) => (
              <li key={option.id}>
                <button
                  onClick={() => handleSaveOptionClick(option.id)}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                 {option.label}
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
