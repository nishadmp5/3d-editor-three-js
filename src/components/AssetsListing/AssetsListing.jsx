import React, { useState } from 'react'
import { ChevronDownIcon, DecorativeIcon, ElectronicsIcon, SearchIcon, SofaIcon } from '../Icons/Icons'
import { SHAPES } from '../../constants/shapeConfigs';
import { AnimatePresence,motion } from 'motion/react';

const sortShapes = (shapes) => {
  const grouped = shapes.reduce((accumulator, shape) => {
    const category = shape.category;

    if (!accumulator[category]) {
      accumulator[category] = [];
    }

    accumulator[category].push(shape);

    return accumulator;
  }, {});

  return Object.keys(grouped).map((category) => ({
    category: category,
    shapes: grouped[category],
  }));
};



const AssetsListing = () => {

   const iconMap = {
       furniture: <SofaIcon />,
       electronics: <ElectronicsIcon />,
       decorative: <DecorativeIcon />,
     };
     const sortedShapes = sortShapes(SHAPES);
   
     const [openAccordion, setOpenAccordion] = useState(
       sortedShapes[0]?.category || null
     );
   
     const handleAccordionToggle = (categoryId) => {
       setOpenAccordion(openAccordion === categoryId ? null : categoryId);
     };
   
     // Helper to capitalize category names for display
     const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
   
     const handleDragStart = (event, shapeId) => {
       event.dataTransfer.setData("text/plain", shapeId);
     };
   

  return (
   <div className="p-4  border-b border-grayborder">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Assets</h3>
          <div className="relative mb-6 bg-white border border-[#e5e7eb] rounded-lg ">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder="Search assets..."
              className="block w-full rounded-md border-gray-300 pl-10 py-2.5 text-sm outline-primary focus:border-primary focus:ring-primary"
            />
          </div>

          <div className="space-y-2">
            {sortedShapes.map((categoryData) => (
              <div key={categoryData.category} className="w-full">
                <button
                  onClick={() => handleAccordionToggle(categoryData.category)}
                  className="w-full flex items-center justify-between p-2 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-x-3">
                    {
                      iconMap[categoryData.category] || (
                        <div className="w-5 h-5" />
                      ) /* Fallback for no icon */
                    }
                    <span className="font-semibold text-gray-800">
                      {capitalize(categoryData.category)}
                    </span>
                  </div>
                  <ChevronDownIcon
                    isOpen={openAccordion === categoryData.category}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {openAccordion === categoryData.category && (
                    <motion.div
                      key="content"
                      initial="collapsed"
                      animate="open"
                      exit="collapsed"
                      variants={{
                        open: { opacity: 1, height: "auto" },
                        collapsed: { opacity: 0, height: 0 },
                      }}
                      transition={{
                        duration: 0.3,
                        ease: [0.04, 0.62, 0.23, 0.98],
                      }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-2 gap-4 pt-4">
                        {categoryData.shapes.map((shape) => (
                          <button
                            key={shape.shapeId}
                            draggable="true"
                            onDragStart={(e) =>
                              handleDragStart(e, shape.shapeId)
                            }
                            className="group bg-white rounded-lg border border-gray-200 p-3 flex flex-col items-center text-center hover:border-primary hover:shadow-sm transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                            title={`Drag to add ${shape.name}`}
                          >
                            <img
                              src={shape.image}
                              alt={shape.name}
                              className="w-full aspect-square object-cover rounded-md pointer-events-none mb-3"
                            />
                            <p className="font-semibold text-sm text-gray-800 truncate">
                              {shape.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {capitalize(shape.category)}
                            </p>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
  )
}

export default AssetsListing