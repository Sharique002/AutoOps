import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'dark' | 'orchid';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {},
  setTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    // Check saved preference in localStorage
    try {
      const saved = localStorage.getItem('autoops-theme');
      if (saved === 'orchid' || saved === 'dark') {
        return saved;
      }
    } catch {
      // Fallback for restricted storage environments
    }
    // Dark charcoal theme is strictly the default for first-time visitors
    return 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('autoops-theme', theme);
    } catch {
      // Ignore storage errors in sandboxed environments
    }
  }, [theme]);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'dark' ? 'orchid' : 'dark'));
  };

  const setTheme = (t: Theme) => {
    setThemeState(t);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
