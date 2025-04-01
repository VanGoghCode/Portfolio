// hoverText.tsx

import React, { useState } from 'react';

interface HoverTextProps {
  text: string;
  className?: string;
  color?: string;
  hoverColor?: string;
}

const HoverText: React.FC<HoverTextProps> = ({
  text,
  className = '',
  color = 'inherit',
  hoverColor = 'var(--color-star-blue)',
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span
      className={`transition-colors duration-300 ${className}`}
      style={{ color: isHovered ? hoverColor : color }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {text}
    </span>
  );
};

export default HoverText;