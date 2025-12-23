import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme-mode');
    return saved ? saved === 'dark' : true; // Default to dark mode
  });

  const [accentColor, setAccentColor] = useState(() => {
    return localStorage.getItem('theme-color') || 'emerald';
  });

  useEffect(() => {
    // Apply accent color theme
    document.documentElement.setAttribute('data-theme', accentColor);
    localStorage.setItem('theme-color', accentColor);
  }, [accentColor]);

  useEffect(() => {
    // Apply dark/light mode
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme-mode', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode, accentColor, setAccentColor }}>
      {children}
    </ThemeContext.Provider>
  );
};