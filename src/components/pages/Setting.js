import React, { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';
import './Settings.css';  // Add custom styles for color swatches

const Settings = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const themes = [
    { name: 'light', color: '#bbbbbb' },
    { name: 'dark', color: '#000000' },
    { name: 'solarized', color: '#586e75' },
    { name: 'forest', color: '#3ecd36' },
    { name: 'ocean', color: '#457b9d' },
    { name: 'sunset', color: '#efca59' },
    { name: 'midnight', color: '#07092f' },
    { name: 'autumn', color: '#f58637' },
    { name: 'pastel', color: '#f4a7b9' },
    { name: 'vintage', color: '#f60303' },
    { name: 'lavender', color: "#47005b"}
  ];

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);  // Update the theme
  };

  return (
    <div>
      <h2>Themes</h2>
      <div className="theme-selector">
        {themes.map((t) => (
          <div
            key={t.name}
            className={`theme-swatch ${theme === t.name ? 'active' : ''}`}
            style={{ backgroundColor: t.color }}
            onClick={() => handleThemeChange(t.name)}
          >
            {theme === t.name && <span className="checkmark">✓</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Settings;