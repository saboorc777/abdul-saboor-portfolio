import { createContext, useContext, useEffect } from 'react';

const ThemeContext = createContext(null);

// Light mode has been removed — the site is dark-only now. This provider
// still exists (rather than deleting it) so nothing else has to change,
// but it no longer stores or toggles anything.
export function ThemeProvider({ children }) {
  useEffect(() => {
    document.documentElement.dataset.theme = 'dark';
  }, []);

  return <ThemeContext.Provider value={{ theme: 'dark' }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider');
  return ctx;
}
