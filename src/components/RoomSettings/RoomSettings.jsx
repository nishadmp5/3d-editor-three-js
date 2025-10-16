import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon, SettingsIcon } from "../Icons/Icons";
import useStore from "../../zustandStore/store";
import {
  ROOM_TEXTURE_MAP,
  ROOM_TEXTURE_OPTIONS,
} from "../../constants/shapeConfigs";

const RoomSettings = () => {
  const { roomSettings, setWallTexture, setFloorTexture, setBrightness } =
    useStore();
  const { wallTexture, floorTexture, roomBrightness } = roomSettings;

  const [openDropdown, setOpenDropdown] = useState(null);

  const dropdownRef = useRef(null);

  // Find the full object for display purposes
  const getTextureById = (id) => ROOM_TEXTURE_OPTIONS.find((t) => t.id === id);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const renderDropdown = (
    textureOptions,
    selectedTextureId,
    onSelect,
    type
  ) => (
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
                <img
                  src={option.image}
                  alt={option.name}
                  className="w-8 h-8 rounded-md object-cover"
                />
                <span className="font-medium">{option.name}</span>
              </button>
            </li>
          ))}
        </motion.ul>
      )}
    </AnimatePresence>
  );

  return (
    <div className="p-4 bg-white">
      <h3 className="flex items-center gap-x-2 text-lg font-bold text-gray-900 mb-6">
        <SettingsIcon />
        <span>Room Settings</span>
      </h3>

      <div className="space-y-6">
        {/* Wall Texture Dropdown */}
        <div
          ref={openDropdown === "wall" ? dropdownRef : null}
          className="relative"
        >
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Wall Texture
          </label>
          <button
            onClick={() =>
              setOpenDropdown(openDropdown === "wall" ? null : "wall")
            }
            className="flex items-center justify-between w-full bg-white border border-gray-300 rounded-md px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <span>{getTextureById(wallTexture)?.name}</span>
            <ChevronDownIcon />
          </button>
          {renderDropdown(
            ROOM_TEXTURE_OPTIONS,
            wallTexture,
            setWallTexture,
            "wall"
          )}
        </div>

        {/* Floor Texture Dropdown */}
        <div
          ref={openDropdown === "floor" ? dropdownRef : null}
          className="relative"
        >
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Floor Texture
          </label>
          <button
            onClick={() =>
              setOpenDropdown(openDropdown === "floor" ? null : "floor")
            }
            className="flex items-center justify-between w-full bg-white border border-gray-300 rounded-md px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <span>{getTextureById(floorTexture)?.name}</span>
            <ChevronDownIcon />
          </button>
          {renderDropdown(
            ROOM_TEXTURE_OPTIONS,
            floorTexture,
            setFloorTexture,
            "floor"
          )}
        </div>

        {/* Room Brightness Slider */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Room Brightness
          </label>
          <div className="flex items-center gap-x-4">
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={roomBrightness}
              onChange={(e) =>  setBrightness(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <span className="text-sm font-medium text-gray-600 w-10 text-right">
              {Math.round(roomBrightness * 100)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomSettings;
