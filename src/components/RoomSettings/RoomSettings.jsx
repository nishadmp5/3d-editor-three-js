import { useEffect, useRef, useState } from "react";
import { GiSettingsKnobs } from "react-icons/gi";
import { GoChevronDown } from "react-icons/go";
import {
  FLOOR_TEXTURE_OPTIONS,
  WALL_TEXTURE_OPTIONS
} from "../../constants/textures";
import { useRoomStore } from "../../store/useRoomStore";
import RenderDropDown from "./RenderDropDown";

const RoomSettings = () => {
  const { roomSettings, setWallTexture, setFloorTexture, setBrightness } =
    useRoomStore();
  const { wallTextureId, floorTextureId, roomBrightness } = roomSettings;

  const [openDropdown, setOpenDropdown] = useState(null);

  const dropdownRef = useRef(null);

  // Find the full object for display purposes
  const getWallTextureById = (id) =>
    WALL_TEXTURE_OPTIONS.find((t) => t.id === id);
  const getFloorTextureById = (id) =>
    FLOOR_TEXTURE_OPTIONS.find((t) => t.id === id);

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


  return (
    <div className="p-4 bg-white">
      <h3 className="flex items-center gap-x-2 text-lg font-bold text-gray-900 mb-6">
        <GiSettingsKnobs />
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
              {getWallTextureById(wallTextureId)?.id !== "default" && (
                  <img
                    src={getWallTextureById(wallTextureId)?.path}
                    alt={getWallTextureById(wallTextureId)?.name}
                    className="w-5.5 h-5.5 rounded-md object-cover"
                  />
                )}
            <span>{getWallTextureById(wallTextureId)?.name}</span>
           <GoChevronDown className="text-2xl text-gray-600" />
          </button>
          <RenderDropDown
            textureOptions={WALL_TEXTURE_OPTIONS}
            selectedTextureId={wallTextureId}
            onSelect={setWallTexture}
            type={"wall"}
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
          />
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
             {getFloorTextureById(floorTextureId)?.id !== "default" && (
                  <img
                    src={getFloorTextureById(floorTextureId)?.path}
                    alt={getFloorTextureById(floorTextureId)?.name}
                    className="w-5.5 h-5.5 rounded-md object-cover"
                  />
                )}
            <span>{getFloorTextureById(floorTextureId)?.name}</span>
            <GoChevronDown className="text-2xl text-gray-600" />
          </button>
          <RenderDropDown
            textureOptions={FLOOR_TEXTURE_OPTIONS}
            selectedTextureId={floorTextureId}
            onSelect={setFloorTexture}
            type={"floor"}
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
          />
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
              onChange={(e) => setBrightness(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-400"
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
