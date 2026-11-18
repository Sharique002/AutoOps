import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'tomorrow' | 'orchid';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'tomorrow',
  toggleTheme: () => {},
  setTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    // Tomorrow Editorial Orchid is strictly the universal default across desktop and mobile
    try {
      const saved = localStorage.getItem('autoops-theme');
      if (saved === 'tomorrow' || saved === 'orchid') {
        return saved;
      }
    } catch {
      // restricted storage fallback
    }
    return 'tomorrow';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('autoops-theme', theme);
    } catch {
      // ignore in sandboxed environments
    }
  }, [theme]);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'tomorrow' ? 'orchid' : 'tomorrow'));
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
