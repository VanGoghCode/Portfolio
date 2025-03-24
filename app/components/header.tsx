//header.tsx


"use client";

import React, { useState } from "react";
import { icons } from "../media/icons";
// import ThemeToggle from "../common/button/themeToggle";
import FlipText from "../common/styling/flipText";

type Props = {
  title?: string;
  darkMode: boolean;
  onToggle: () => void;
};

const Header: React.FC<Props> = ({
  title = "K | R t A n",
  darkMode,
  // onToggle,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const DropdownMenu = () => (
    <div
      id="mobile-menu"
      className={`
        absolute top-12 right-4 w-48 md:hidden
        backdrop-blur-xl
        border
        rounded-lg
        shadow-md
        transition-all duration-500 ease-in-out
        ${isDropdownOpen ? "max-h-100 opacity-100" : "max-h-0 opacity-0"}
        overflow-hidden
        ${darkMode 
          ? "bg-primary border-primary/30" 
          : "bg-background border-secondary/20"
        }
      `}
      style={{
        backgroundColor: darkMode ? 'var(--color-primary)' : 'var(--color-background)',
        borderColor: darkMode ? 'var(--color-primary)' : 'var(--color-secondary)'
      }}
    >
      <div className="py-2 space-y-1">
        {[
          { name: "Home", icon: icons.Home },
          { name: "Projects", icon: icons.Projects },
          { name: "Blogs", icon: icons.Blog },
          { name: "About", icon: icons.About },
          { name: "Contact", icon: icons.Contact },
        ].map(({ name, icon: IconComponent }) => (
          <a 
            key={name} 
            href={`#${name.toLowerCase()}`} 
            className="flex items-center px-4 py-3"
          >
            <IconComponent />
            <div className="flex items-center justify-between w-full">
              <span 
                className="ml-2 text-sm font-medium"
                style={{ 
                  color: darkMode 
                    ? 'var(--color-text-light)' 
                    : 'var(--color-text-primary)' 
                }}
              >
                <FlipText text={name} />
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );

  return (
    <header className="fixed top-4 z-10 w-full flex items-center justify-center px-4 sm:px-6">
      <div className="relative w-full max-w-6xl">
        <div 
          className={`
            backdrop-blur-[2px] 
            transition-all duration-300 ease-out 
            rounded-lg 
            border 
            shadow-sm
          `}
          style={{
            backgroundColor: darkMode 
              ? 'rgba(var(--color-primary), 0.1)' 
              : 'rgba(var(--color-background), 0.8)',
            borderColor: darkMode 
              ? 'var(--color-primary)' 
              : 'var(--color-secondary)'
          }}
        >
          <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-4 sm:px-6">
            <h1 
              className="sm:text-xl font-bold glow-text"
              style={{ 
                color: darkMode 
                  ? 'var(--color-secondary)' 
                  : 'var(--color-text-primary)' 
              }}
            >
              {title}
            </h1>
            <nav className="hidden md:flex items-center gap-6">
              {["Home", "Projects", "Blogs", "About", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`
                    text-sm font-medium transition-colors hover:text-[var(--color-accent)]
                    ${darkMode ? 'text-[var(--color-text-light)]' : 'text-[var(--color-text-primary)]'}
                  `}
                >
                <FlipText text={item} />
                </a>
              ))}
              {/* <ThemeToggle onToggle={onToggle} /> */}
            </nav>
            {/* Mobile Menu Button with animation */}
            <div className="md:hidden flex items-center gap-2">
              {/* <ThemeToggle onToggle={onToggle} /> */}
              {/* <button 
                onClick={onToggle}
                className="p-2 rounded-full transition-all duration-300 mr-2"
                style={{
                  backgroundColor: darkMode 
                    ? 'var(--color-primary)' 
                    : 'var(--color-secondary)',
                  color: 'var(--color-text-light)'
                }}
              >
                {darkMode ? '☀️' : '🌙'}
              </button> */}
              <button
                className="p-2 rounded-lg transition-colors"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                aria-expanded={isDropdownOpen}
                aria-controls="mobile-menu"
              >
                <div className="w-6 h-6 flex flex-col justify-center items-center">
                  <span
                    className={`
                      block w-5 h-0.5 rounded-full
                      transition-all duration-300 ease-in-out
                      absolute
                      ${isDropdownOpen ? "rotate-45" : "-translate-y-1.5"}
                    `}
                    style={{
                      backgroundColor: darkMode 
                        ? 'var(--color-text-light)' 
                        : 'var(--color-text-primary)'
                    }}
                  ></span>
                  <span
                    className={`
                      block w-5 h-0.5 rounded-full
                      transition-all duration-300 ease-in-out
                      absolute
                      ${isDropdownOpen ? "opacity-0" : "opacity-100"}
                    `}
                    style={{
                      backgroundColor: darkMode 
                        ? 'var(--color-text-light)' 
                        : 'var(--color-text-primary)'
                    }}
                  ></span>
                  <span
                    className={`
                      block w-5 h-0.5 rounded-full
                      transition-all duration-300 ease-in-out
                      absolute
                      ${isDropdownOpen ? "-rotate-45" : "translate-y-1.5"}
                    `}
                    style={{
                      backgroundColor: darkMode 
                        ? 'var(--color-text-light)' 
                        : 'var(--color-text-primary)'
                    }}
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
