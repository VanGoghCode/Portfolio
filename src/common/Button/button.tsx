import React from 'react';
import "./button.css";

interface ButtonProps {
  buttonName: string;
  backgroundColor: string;
  color: string;
  image?: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ buttonName, backgroundColor, color, image, onClick }) => {
  return (
    <div className="button">
      <button
        className="button-container"
        style={{
          backgroundColor: backgroundColor,
          color: color,
        }}
        onClick={onClick}
      >
        {/* {image === 'upload' && <img src={exportIcon} alt="export" />} */}
        <span>{buttonName}</span>
      </button>
    </div>
  );
};

export default Button;

// export const GoogleButton: React.FC = () => {
//   return (
//     <div className="GoogleButton">
//       <img src={googleLogo} alt="Google" />
//       <span>Sign in with Google</span>
//     </div>
//   );
// };
