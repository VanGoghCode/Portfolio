// flipText.tsx

"use client";

import React, { useRef, useEffect } from 'react';

interface FlipTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  delayBetweenChars?: number; // milliseconds between each character
}

const FlipText: React.FC<FlipTextProps> = ({ 
  text, 
  className = '', 
  style = {},
  delayBetweenChars = 50
}) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  
  const characters = text.split('');
  
  useEffect(() => {
    if (containerRef.current) {
      const charElements = containerRef.current.querySelectorAll('.flip-text-char');
      charElements.forEach((char, index) => {
        (char as HTMLElement).style.setProperty('--char-index', index.toString());
      });
    }
  }, [text]);

  return (
    <span 
      ref={containerRef}
      className={`flip-text-container ${className}`} 
      style={{
        '--delay-between-chars': `${delayBetweenChars}ms`,
        ...style
      } as React.CSSProperties}
    >
      {characters.map((char, index) => (
        <span 
          key={index} 
          className="flip-text-char"
          style={{ '--char-index': index } as React.CSSProperties}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
};

export default FlipText;
