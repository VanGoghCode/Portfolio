import React, { useState, useEffect } from 'react';

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<string>('light');

  useEffect(() => {
    const savedTheme: string | null = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.body.classList.add(savedTheme);
    } else {
      setTheme('light');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme: string = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.classList.remove(theme);
    document.body.classList.add(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <button onClick={toggleTheme}>
      {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
    </button>
  );
};

export default ThemeToggle;
