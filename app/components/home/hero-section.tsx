// hero-section.tsx

"use client";

import React, { useEffect, useState, useRef } from 'react';

const HeroSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [charClass, setCharClass] = useState<string[]>([]);
  const [revealComplete, setRevealComplete] = useState(false);
  const fullText = 'Think like a Creator ...';
  const typingSpeed = 120;
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const glitchIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsVisible(true);

    let currentIndex = 0;
    const initialClasses = Array(fullText.length).fill('opacity-0');
    setCharClass(initialClasses);

    // Main typing effect
    typingIntervalRef.current = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.substring(0, currentIndex));

        // Update character classes for appearing effect
        if (currentIndex > 0) {
          setCharClass(prev => {
            const newClasses = [...prev];
            // Add higher opacity and contrast to ensure visibility
            if (currentIndex === 1) {
              // Special treatment for first character
              newClasses[currentIndex - 1] = 'opacity-100 text-glitch font-bold';
            } else {
              newClasses[currentIndex - 1] = 'opacity-100 text-glitch';
            }
            return newClasses;
          });
        }

        currentIndex++;
      } else {
        if (typingIntervalRef.current) {
          clearInterval(typingIntervalRef.current);
          typingIntervalRef.current = null;

          // Start random character glitch effect after typing is done
          setRevealComplete(true);
          startGlitchEffect();
        }
      }
    }, typingSpeed);

    return () => {
      if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
      if (glitchIntervalRef.current) clearInterval(glitchIntervalRef.current);
    };
  }, []);

  // Random glitch effect
  const startGlitchEffect = () => {
    glitchIntervalRef.current = setInterval(() => {
      // Randomly select 1-3 characters to glitch
      const numGlitches = Math.floor(Math.random() * 3) + 1;

      for (let i = 0; i < numGlitches; i++) {
        const randomIndex = Math.floor(Math.random() * fullText.length);

        // Apply glitch class to the character
        setCharClass(prev => {
          const newClasses = [...prev];
          newClasses[randomIndex] = 'opacity-100 text-glitch-active';

          // Reset after a short time
          setTimeout(() => {
            setCharClass(prev => {
              if (!prev[randomIndex]?.includes('active')) return prev;
              const resetClasses = [...prev];
              resetClasses[randomIndex] = 'opacity-100 text-glitch';
              return resetClasses;
            });
          }, 150 + Math.random() * 200);

          return newClasses;
        });
      }
    }, 1200 + Math.random() * 800);
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-12 md:py-20 lg:py-28 w-full overflow-hidden">
      <div
        className={`text-center w-full max-w-10xl mx-auto transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'
          }`}
      >
        <div className={`relative ${revealComplete ? 'hero-text-revealed' : ''}`}>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 bungee-shade">
            <div className="glitch-wrapper relative">
              {typedText.split('').map((char, index) => (
                <span
                  key={index}
                  className={`hero-char transition-all text-glitch duration-300 ${charClass[index+1] || 'opacity-0'}`}
                  // Update the style prop for the first character
                  style={{
                    '--char-index': index,
                    // textShadow: index === 0 ? '0 0 10px var(--color-accent), 0 0 15px var(--color-accent)' : undefined,
                    color: index === 0 ? 'var(--color-accent)' : undefined
                  } as React.CSSProperties}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
              <span
                className={`inline-flex h-[1em] w-[0.1em] rounded-sm bg-accent ml-1 animate-blink ${revealComplete ? 'opacity-30' : 'opacity-100'}`}
                aria-hidden="true"
              ></span>
            </div>
          </h1>
        </div>

        {/* <p className={`mt-8 text-base sm:text-lg md:text-xl text-color-text-secondary max-w-2xl mx-auto transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
          Crafting digital experiences that blend functionality with imagination
        </p> */}
      </div>
    </section>
  );
};

export default HeroSection;