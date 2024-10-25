import React, { createContext, useContext, useState } from 'react';

// Create the context
export const ThemeContext = createContext(null);

// Create a provider component
export const ThemeProvider = ({ children }) => {
  // Initialize theme state with localStorage or default to 'light'
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  // Update localStorage whenever the theme changes
  const updateTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme); // Persist theme preference
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};


export const useTheme = () => useContext(ThemeContext);
