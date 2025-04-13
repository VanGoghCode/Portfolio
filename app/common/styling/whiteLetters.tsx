import React from "react";

interface WlProps {
  text: string;
}

const Wl: React.FC<WlProps> = ({ text }) => {
  return (
    <span
      className="inline-block glow-text-White pl-0.5"
      style={{
        color: "var(--color-text-light)",
      }}
    >
      {text}
    </span>
  );
};

export default Wl;
