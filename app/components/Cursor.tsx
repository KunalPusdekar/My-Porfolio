'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);  // To track if the cursor is hovering over a target

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    
    // Set up mouse move event listener to update cursor position
    window.addEventListener("mousemove", move);

    // Event listeners to detect hover on buttons, links, or hover-target class elements
    const hoverTargets = document.querySelectorAll(
      'a, button, .hover-target, [data-blobity]'
    );

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Add hover event listeners
    hoverTargets.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      // Clean up event listeners when component unmounts
      window.removeEventListener("mousemove", move);
      hoverTargets.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <motion.div
      className={`pointer-events-none fixed z-[9999] transition-all duration-100 
        ${isHovering ? 'w-16 h-16' : 'w-6 h-6'} 
        bg-white/20 backdrop-blur-sm border border-white/50 rounded-full`}
      animate={{
        x: position.x - 16, // Adjust the X position by subtracting half the width (16px for hover size)
        y: position.y - 16, // Adjust the Y position by subtracting half the height (16px for hover size)
      }}
      transition={{ type: "spring", stiffness: 700, damping: 20 }} // Increased stiffness and decreased damping for faster movement
    />
  );
};

export default Cursor;
