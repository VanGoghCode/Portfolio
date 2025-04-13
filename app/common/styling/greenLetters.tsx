import React from "react";

interface GlProps {
  text: string;
}

const Gl: React.FC<GlProps> = ({ text }) => {
  return (
    <span
      className="inline-block glow-text pl-0.5"
      style={{
        color: "var(--color-secondary)",
      }}
    >
      {text}
    </span>
  );
};

export default Gl;
