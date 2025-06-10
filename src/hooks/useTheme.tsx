
import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check if theme is already in localStorage
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    // Check if browser prefers dark mode
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    return storedTheme || (prefersDark ? 'dark' : 'light');
  });
  
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove the old theme class and add the new one
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    
    // Save theme preference to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  return { theme, setTheme };
}
