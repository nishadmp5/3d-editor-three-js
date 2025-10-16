import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TIPS_LIST = [
  "Tip: Right-click objects in the 3D view for quick actions like Delete,Duplicate.",
  "Tip: Use the scroll wheel to zoom in and out of the scene.",
  "Tip: Hold Shift while dragging to move objects on a single axis.",
  "Tip: You can change wall and floor textures in the Scene Settings panel.",
  "Tip: Right-click objects in the 3D view for changing transform properties.",
  "Tip: Scroll down the sidebar to view transform properties.",
  "Tip: Adjust the room brightness on sidebar for a better view.",
  "Tip: Try to use the axis arrows for better control.",
  "Tip: use Ctrl+Drag withing the viewer to adjust camera position.",
];

const TipsViewer = () => {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTipIndex((prevIndex) => (prevIndex + 1) % TIPS_LIST.length);
    }, 4000);

    return () => clearInterval(intervalId);
  }, []);

  const variants = {
    enter: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="hidden lg:block">
      <div className="bg-slate-100/80 text-slate-600 text-sm px-4 py-2 rounded-lg w-96 h-10 flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTipIndex}
            variants={variants}
            initial={{ opacity: 0, y: 10 }}
            animate="enter"
            exit="exit"
            className="text-center"
          >
            {TIPS_LIST[currentTipIndex]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TipsViewer;