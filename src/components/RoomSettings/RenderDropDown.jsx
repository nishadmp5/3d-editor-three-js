import { AnimatePresence, motion } from "motion/react";
import React from "react";

const RenderDropDown = ({
  textureOptions,
  selectedTextureId,
  onSelect,
  type,
  openDropdown,
  setOpenDropdown,
}) => {
  return (
    <AnimatePresence>
      {openDropdown === type && (
        <motion.ul
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute z-10 w-full mt-2 bg-white rounded-md shadow-lg border border-gray-200 p-1"
        >
          {textureOptions.map((option) => (
            <li key={option.id}>
              <button
                onClick={() => {
                  onSelect(option.id);
                  setOpenDropdown(null);
                }}
                className={`w-full flex items-center gap-x-3 text-left p-2 rounded-md text-sm transition-colors ${
                  selectedTextureId === option.id
                    ? "bg-blue-50 text-primary"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {option.id !== "default" && (
                  <img
                    src={option.path}
                    alt={option.name}
                    className="w-8 h-8 rounded-md object-cover"
                  />
                )}
                <span className="font-medium">{option.name}</span>
              </button>
            </li>
          ))}
        </motion.ul>
      )}
    </AnimatePresence>
  );
};

export default RenderDropDown;
