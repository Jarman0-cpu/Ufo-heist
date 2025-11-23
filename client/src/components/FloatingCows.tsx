import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import cowImage from "@assets/generated_images/surprised_cow_floating_in_space_with_zero_gravity_bubble,_playful_vector_style.png";

interface Cow {
  id: number;
  y: number; // Starting Y position (percentage)
  scale: number;
  duration: number;
  delay: number;
}

export function FloatingCows() {
  const [cows, setCows] = useState<Cow[]>([]);
  const [nextId, setNextId] = useState(0);

  useEffect(() => {
    // Spawn a cow every few seconds
    const interval = setInterval(() => {
      if (Math.random() > 0.3) { // 70% chance to spawn
        const newCow: Cow = {
          id: Date.now(),
          y: Math.random() * 80 + 10, // Random height between 10% and 90%
          scale: Math.random() * 0.5 + 0.3, // Random size
          duration: Math.random() * 10 + 15, // Slow float (15-25s)
          delay: 0
        };
        
        setCows(prev => [...prev, newCow]);

        // Cleanup old cows to prevent memory leaks (though AnimatePresence handles DOM removal)
        // We'll remove them from state after they're definitely off screen
        setTimeout(() => {
            setCows(prev => prev.filter(c => c.id !== newCow.id));
        }, (newCow.duration + 1) * 1000);
      }
    }, 4000); // Check every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <AnimatePresence>
        {cows.map(cow => (
          <motion.img
            key={cow.id}
            src={cowImage}
            alt="Floating Space Cow"
            initial={{ x: "-10vw", y: `${cow.y}vh`, rotate: 0, opacity: 0 }}
            animate={{ 
              x: "110vw", 
              y: [`${cow.y}vh`, `${cow.y - 10}vh`, `${cow.y + 10}vh`, `${cow.y}vh`], // Bobbing motion
              rotate: 360,
              opacity: [0, 1, 1, 0]
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: cow.duration, 
              ease: "linear",
              y: {
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
            style={{ 
              position: "absolute", 
              width: "150px",
              scale: cow.scale
            }}
            className="drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
