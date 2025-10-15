import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- Helper SVG Icon ---
const SettingsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
    </svg>
);

const ChevronDownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 text-gray-400">
        <path strokeLinecap="round" strokeLinejoin="round" d="m19.94 8.25-7.44 7.5-7.44-7.5" />
    </svg>
);


// --- Dummy Data ---
const TEXTURE_OPTIONS = [
    { id: 'wood_paneling', name: 'Wooden Paneling', image: 'https://via.placeholder.com/150/A16207/FFFFFF?text=Wood' },
    { id: 'polished_concrete', name: 'Polished Concrete', image: 'https://via.placeholder.com/150/6B7280/FFFFFF?text=Concrete' },
    { id: 'red_brick', name: 'Red Brick', image: 'https://via.placeholder.com/150/DC2626/FFFFFF?text=Brick' },
    { id: 'white_marble', name: 'White Marble', image: 'https://via.placeholder.com/150/F3F4F6/000000?text=Marble' },
    { id: 'painted_wall', name: 'Painted Wall', image: 'https://via.placeholder.com/150/3B82F6/FFFFFF?text=Paint' },
];


const RoomSettings = () => {
    const [selectedWallTexture, setSelectedWallTexture] = useState(TEXTURE_OPTIONS[0].id);
    const [selectedFloorTexture, setSelectedFloorTexture] = useState(TEXTURE_OPTIONS[1].id);
    const [brightness, setBrightness] = useState(70);
    const [openDropdown, setOpenDropdown] = useState(null); // 'wall', 'floor', or null

    const dropdownRef = useRef(null);
    
    // Find the full object for display purposes
    const getTextureById = (id) => TEXTURE_OPTIONS.find(t => t.id === id);

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

    const renderDropdown = (options, selectedId, onSelect, type) => (
        <AnimatePresence>
            {openDropdown === type && (
                <motion.ul
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute z-10 w-full mt-2 bg-white rounded-md shadow-lg border border-gray-200 p-1"
                >
                    {options.map((option) => (
                        <li key={option.id}>
                            <button
                                onClick={() => {
                                    onSelect(option.id);
                                    setOpenDropdown(null);
                                }}
                                className={`w-full flex items-center gap-x-3 text-left p-2 rounded-md text-sm transition-colors ${selectedId === option.id ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
                            >
                                <img src={option.image} alt={option.name} className="w-8 h-8 rounded-md object-cover" />
                                <span className="font-medium">{option.name}</span>
                            </button>
                        </li>
                    ))}
                </motion.ul>
            )}
        </AnimatePresence>
    );

    return (
        <div className="p-4">
            <h3 className="flex items-center gap-x-2 text-lg font-bold text-gray-900 mb-6">
                <SettingsIcon />
                <span>Room Settings</span>
            </h3>

            <div className="space-y-6">
                {/* Wall Texture Dropdown */}
                <div ref={openDropdown === 'wall' ? dropdownRef : null} className="relative">
                    <label className="block text-sm font-medium text-gray-600 mb-2">Wall Texture</label>
                    <button onClick={() => setOpenDropdown(openDropdown === 'wall' ? null : 'wall')} className="flex items-center justify-between w-full bg-white border border-gray-300 rounded-md px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <span>{getTextureById(selectedWallTexture)?.name}</span>
                        <ChevronDownIcon />
                    </button>
                    {renderDropdown(TEXTURE_OPTIONS, selectedWallTexture, setSelectedWallTexture, 'wall')}
                </div>

                {/* Floor Texture Dropdown */}
                <div ref={openDropdown === 'floor' ? dropdownRef : null} className="relative">
                    <label className="block text-sm font-medium text-gray-600 mb-2">Floor Texture</label>
                    <button onClick={() => setOpenDropdown(openDropdown === 'floor' ? null : 'floor')} className="flex items-center justify-between w-full bg-white border border-gray-300 rounded-md px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <span>{getTextureById(selectedFloorTexture)?.name}</span>
                        <ChevronDownIcon />
                    </button>
                    {renderDropdown(TEXTURE_OPTIONS, selectedFloorTexture, setSelectedFloorTexture, 'floor')}
                </div>

                {/* Atmosphere Brightness Slider */}
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">Atmosphere Brightness</label>
                    <div className="flex items-center gap-x-4">
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={brightness}
                            onChange={(e) => setBrightness(e.target.value)}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                        <span className="text-sm font-medium text-gray-600 w-10 text-right">{brightness}%</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomSettings;