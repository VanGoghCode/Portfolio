"use client";

import React, { useState } from "react";
import Toggle from "../common/button/themeToggle";
import { icons } from "../media/icons";
import "../../app/globals.css";

type Props = {
  title?: string;
  darkMode: boolean;
  onToggle: () => void;
};

const Header: React.FC<Props> = ({
  title = "Starry Night",
  darkMode,
  onToggle,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const DropdownMenu = () => (
    <div
      id="mobile-menu"
      className={`
      absolute top-12 right-4 w-48 md:hidden
      ${darkMode ? "bg-gray-900/80" : "bg-white/90"}
      backdrop-blur-xl
      border ${darkMode ? "border-gray-700/30" : "border-gray-200/50"}
      rounded-2xl
      shadow-lg
      transition-all duration-500 ease-in-out
      ${isDropdownOpen ? "max-h-100 opacity-100" : "max-h-0 opacity-0"}
      overflow-hidden
    `}
    >
      <div className="py-2 space-y-1">
        {[
          { name: "Home", icon: icons.Home },
          { name: "Projects", icon: icons.Projects },
          { name: "About", icon: icons.About },
          { name: "Contact", icon: icons.Contact },
          { name: "Theme", icon: icons.Theme, isToggle: true },
        ].map(({ name, icon: IconComponent, isToggle }) => (
          <div key={name} className="flex items-center px-4 py-3">
            <IconComponent/>
            <div className="flex items-center justify-between w-full">
            <span
              className={`ml-2 text-sm font-medium ${
                darkMode ? "text-[var(--text-dark)]" : "text-[var(--text-light)]"
              }`}
            >
              {name}
            </span>
            {isToggle && <Toggle onToggle={onToggle} />}
          </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <header className="fixed top-4 z-1 w-full flex items-center justify-center px-4 sm:px-6">
      <div className="relative w-full max-w-6xl">
        <div
          className={`
        backdrop-blur-[2px]
        transition-all duration-300 ease-out
        rounded-2xl
        border-[1.5px]
        shadow-[0_8px_32px_0_rgba(0,0,0,0.1)]
        ${darkMode ? "border-gray-600/20" : "border-gray-300/30"}
      `}
        >
          <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-2 sm:px-6 sm:py-2">
            <h1
              className={`text-lg sm:text-xl font-bold transition-colors ${
                darkMode ? "text-gray-100" : "text-gray-800"
              }`}
            >
              {title}
            </h1>

            <nav className="hidden md:flex items-center gap-6">
              {["Home", "Projects", "About", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`text-sm font-medium transition-colors hover:text-indigo-400 ${
                    darkMode
                      ? "text-[var(--text-dark)]"
                      : "text-[var(--text-light)]"
                  }`}
                >
                  {item}
                </a>
              ))}
              <Toggle onToggle={onToggle} />
            </nav>

            {/* Mobile Menu Button with animation */}
            <div className="md:hidden">
              <button
                className={`md:hidden p-2 rounded-lg transition-colors ${
                  darkMode ? "hover:bg-gray-800/40" : "hover:bg-gray-100/50"
                }`}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                aria-expanded={isDropdownOpen}
                aria-controls="mobile-menu"
              >
                <div className="w-6 h-6 flex flex-col justify-center items-center">
                  <span
                    className={`
                  block w-5 h-0.5 rounded-full
                  transition-all duration-300 ease-in-out
                  ${darkMode ? "bg-gray-300" : "bg-gray-700"}
                  absolute
                  ${isDropdownOpen ? "rotate-45" : "-translate-y-1.5"}
                `}
                  ></span>
                  <span
                    className={`
                  block w-5 h-0.5 rounded-full
                  transition-all duration-300 ease-in-out
                  ${darkMode ? "bg-gray-300" : "bg-gray-700"}
                  absolute
                  ${isDropdownOpen ? "opacity-0" : "opacity-100"}
                `}
                  ></span>
                  <span
                    className={`
                  block w-5 h-0.5 rounded-full
                  transition-all duration-300 ease-in-out
                  ${darkMode ? "bg-gray-300" : "bg-gray-700"}
                  absolute
                  ${isDropdownOpen ? "-rotate-45" : "translate-y-1.5"}
                `}
                  ></span>
                </div>
              </button>
              {<DropdownMenu />}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
