import "./header.css";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../../common/ThemeToggleButton/ThemeToggle";

const Header = () => {
  const navigate = useNavigate()
  return (
    <div className="header">
      <div className="container">
        <div className="logo">LOGO</div>
        <div className="options">
          <div className="option">Solution</div>
          <div className="option">Platform</div>
          <div className="option">Connect</div>
        </div>
        <div className="buttons">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default Header;
