import React from "react";

interface GoldenProps {
  text: string;
}

const AsuLetters: React.FC<GoldenProps> = ({ text }) => {
  return (
    <span
      className="inline-block glow-text-asu pl-0.5"
      style={{
        color: "var(--color-asu)",
      }}
    >
      {text}
    </span>
  );
};

export default AsuLetters;
