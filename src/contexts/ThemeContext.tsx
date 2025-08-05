import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ThemeConfig } from '../types/testimonial';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  themeConfig: ThemeConfig;
  updateThemeConfig: (config: Partial<ThemeConfig>) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const defaultThemeConfig: ThemeConfig = {
  primaryColor: 'blue',
  fontStyle: 'system',
  borderRadius: 'rounded',
  shadow: true,
};

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [themeConfig, setThemeConfig] = useState<ThemeConfig>(defaultThemeConfig);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const updateThemeConfig = (config: Partial<ThemeConfig>) => {
    setThemeConfig(prev => ({ ...prev, ...config }));
  };

  return (
    <ThemeContext.Provider value={{
      isDarkMode,
      toggleDarkMode,
      themeConfig,
      updateThemeConfig,
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};