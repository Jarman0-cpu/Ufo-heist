import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function TractorBeamCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "BUTTON" || target.tagName === "A" || target.closest("button") || target.closest("a")) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
      animate={{
        x: mousePosition.x - 16,
        y: mousePosition.y - 16,
      }}
      transition={{
        type: "spring",
        damping: 30,
        stiffness: 200,
        mass: 0.5
      }}
    >
      {/* UFO Body */}
      <div className="relative">
        <div className="w-8 h-4 bg-white rounded-full shadow-[0_0_10px_theme('colors.primary')] relative z-10 border border-primary/50" />
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-primary/20 rounded-full border border-primary/50" />
        
        {/* Tractor Beam */}
        <motion.div 
          className="absolute top-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[15px] border-r-[15px] border-b-[40px] border-l-transparent border-r-transparent border-b-primary/30 blur-[2px]"
          animate={{
            opacity: isHovering ? 0.8 : 0,
            scale: isHovering ? 1.2 : 0.5,
            height: isHovering ? 60 : 0,
          }}
        />
        
        {/* Particles */}
        {isHovering && (
          <div className="absolute top-full left-1/2 -translate-x-1/2">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                initial={{ y: 0, opacity: 1 }}
                animate={{ y: 20, opacity: 0 }}
                transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.1 }}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
