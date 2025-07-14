import { TechStack } from '@/app/common/constants/constants';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon, ChevronUpIcon } from "@/app/media/icons";

const TechStackCategories = () => {
  const [activeCategory, setActiveCategory] = useState<keyof typeof TechStack | null>(null);
  const [animationComplete, setAnimationComplete] = useState(false);
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (activeCategory !== null) {
      setAnimationComplete(false);
    }
  }, [activeCategory]);

  // Handle mouse movement for glow effect
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
    const button = buttonsRef.current[index];
    if (button) {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      button.style.setProperty('--x', x.toString());
      button.style.setProperty('--y', y.toString());
    }
  };

  const toggleCategory = (category: keyof typeof TechStack) => {
    if (activeCategory === category) {
      setActiveCategory(null);
      setTimeout(() => {
      }, 300);
    } 
    else if (activeCategory !== null && category !== activeCategory) {
      setActiveCategory(null);
      setTimeout(() => {
        setActiveCategory(category);
      }, 300);
    } 
    else {
      setActiveCategory(category);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, height: 0 },
    show: {
      opacity: 1,
      height: "auto",
      transition: {
        opacity: { duration: 0.3 },
        height: { duration: 0.4 },
        staggerChildren: 0.08,
      }
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        opacity: { duration: 0.3 },
        height: { duration: 0.3 }
      }
    }
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 250,
        damping: 12,
        mass: 0.8
      }
    },
    exit: {
      y: -10,
      opacity: 0,
      transition: {
        duration: 0.2
      }
    }
  };

  const getAnimationKey = () => {
    return activeCategory ? `category-${activeCategory}` : 'no-category';
  };

  return (
    <div className="tech-categories">
      {/* Category Buttons */}
      <div className="flex flex-wrap gap-2 mb-4 justify-center md:justify-start">
        {(Object.keys(TechStack) as (keyof typeof TechStack)[]).map((category, index) => (
          <motion.button
            key={category}
            ref={el => { buttonsRef.current[index] = el; }}
            onClick={() => toggleCategory(category)}
            onMouseMove={(e) => handleMouseMove(e, index)}
            className={`glow-hover-button px-3 py-1 rounded-full text-sm transition-all cursor-pointer flex items-center space-x-1 ${
              activeCategory === category 
                ? 'bg-primary text-white shadow-lg' 
                : 'bg-gray-800 text-secondary hover:bg-gray-700'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>{category}</span>
            <motion.span
              initial={false}
              animate={{ rotate: activeCategory === category ? 360 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeCategory === category ? (
                <ChevronUpIcon />
              ) : (
                <ChevronDownIcon />
              )}
            </motion.span>
          </motion.button>
        ))}
      </div>
      
      {/* Container for tech badges with fixed height to prevent layout shift */}
      <div className="min-h-20 relative">
        <AnimatePresence mode="wait">
          {activeCategory && (
            <motion.div 
              key={getAnimationKey()}
              className="absolute w-full mt-3 flex flex-wrap gap-2 justify-center md:justify-start"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              onAnimationComplete={() => setAnimationComplete(true)}
            >
              {TechStack[activeCategory].map((tech, index) => (
                <motion.span 
                  key={`${activeCategory}-${tech}`}
                  className="tech-badge"
                  variants={itemVariants}
                  custom={index}
                  animate={animationComplete ? {
                    y: [0, -3, 0],
                    transition: {
                      delay: index * 0.1,
                      duration: 0.6,
                      repeat: Infinity,
                      repeatDelay: 2 + Math.random() * 3,
                      ease: "easeInOut"
                    }
                  } : {}}
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TechStackCategories;