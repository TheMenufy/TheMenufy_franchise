import React, { createContext, useState, useEffect } from 'react';
import { Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';  // Import AsyncStorage

// Create the context
export const ThemeContext = createContext();

// Define light and dark themes
const lightTheme = {
  background: '#ffffff',
  text: '#000000',
};

const darkTheme = {
  background: '#000000',
  text: '#ffffff',
};

// Theme provider component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(lightTheme);  // Default to light theme

  // Load theme from AsyncStorage on app load
  useEffect(() => {
    const loadTheme = async () => {
      const storedTheme = await AsyncStorage.getItem('theme');
      if (storedTheme) {
        setTheme(storedTheme === 'dark' ? darkTheme : lightTheme);
      } else {
        // If no stored theme, use system default or light theme
        setTheme(Appearance.getColorScheme() === 'dark' ? darkTheme : lightTheme);
      }
    };
    loadTheme();
  }, []);

  // Toggle between light and dark themes
  const toggleTheme = async () => {
    const newTheme = theme === lightTheme ? darkTheme : lightTheme;
    setTheme(newTheme);
    // Save the selected theme to AsyncStorage
    await AsyncStorage.setItem('theme', newTheme === darkTheme ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
