import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    // Check for saved preference, otherwise strictly default to dark mode
    const savedTheme = localStorage.getItem('portfolio-theme');
    const initialTheme = savedTheme ? savedTheme : 'dark';
    
    setTheme(initialTheme);
    document.documentElement.setAttribute('data-theme', initialTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <button 
      className="theme-toggle-btn" 
      onClick={toggleTheme}
      aria-label="Toggle theme"
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <div className="icon-container">
        <Sun className="icon-sun" size={20} />
        <Moon className="icon-moon" size={20} />
      </div>
    </button>
  );
};

export default ThemeToggle;
