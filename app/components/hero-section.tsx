// hero-section.tsx

"use client";

import React, { useEffect, useState, useRef } from 'react';

const HeroSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const fullText = 'Build like an artist ...';
  const typingSpeed = 100;
  const cursorBlinkRef = useRef<NodeJS.Timeout | null>(null);
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsVisible(true);
    
    let currentIndex = 0;
    typingIntervalRef.current = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.substring(0, currentIndex));
        currentIndex++;
      } else {
        if (typingIntervalRef.current) {
          clearInterval(typingIntervalRef.current);
          typingIntervalRef.current = null;
          
          cursorBlinkRef.current = setInterval(() => {
            setCursorVisible(prev => !prev);
          }, 600);
        }
      }
    }, typingSpeed);
    
    return () => {
      if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
      if (cursorBlinkRef.current) clearInterval(cursorBlinkRef.current);
    };
  }, []);

  return (
    <section className="flex flex-col items-center justify-center min-h-[50vh] px-4 py-12 md:py-20 lg:py-28 w-full">
      <div 
        className={`text-center w-full max-w-4xl mx-auto transition-opacity duration-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          <span className="text-gradient whitespace-pre-wrap sm:whitespace-nowrap">
            {typedText}
            <span 
              className={`inline-flex h-[0.7em] w-[0.1em] rounded-full bg-accent ml-1 ${
                cursorVisible ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ backgroundColor: 'var(--color-accent)' }}
              aria-hidden="true"
            ></span>
          </span>
        </h1>
        
        <p className={`mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-color-text-secondary max-w-2xl mx-auto transition-all duration-1000 delay-500 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
        style={{ color: 'var(--color-text-secondary)' }}>
          Crafting digital experiences that blend functionality with imagination
        </p>
      </div>
    </section>
  );
};

export default HeroSection;