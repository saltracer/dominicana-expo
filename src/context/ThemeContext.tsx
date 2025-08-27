import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme, AppState, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Theme, getThemeColors } from '../constants/colors';

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  colors: ReturnType<typeof getThemeColors>;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  getEffectiveTheme: () => 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = '@dominicana_theme';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [theme, setThemeState] = useState<Theme>('system');

  // Debug: Log when systemColorScheme changes
  useEffect(() => {
    console.log('System color scheme changed:', systemColorScheme);
  }, [systemColorScheme]);

  useEffect(() => {
    loadTheme();
  }, []);

  // Listen for system theme changes
  useEffect(() => {
    const handleAppStateChange = (nextAppState: string) => {
      console.log('App state changed:', nextAppState, 'Current theme:', theme);
      if (nextAppState === 'active' && theme === 'system') {
        // Force a re-render when app becomes active and theme is set to system
        // This will pick up any system theme changes
        console.log('Forcing theme refresh due to app state change');
        setThemeState(theme);
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => subscription?.remove();
  }, [theme]);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      console.log('Loading saved theme:', savedTheme);
      if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'system')) {
        setThemeState(savedTheme);
      } else {
        // Default to system preference
        console.log('No saved theme found, defaulting to system');
        setThemeState('system');
      }
    } catch (error) {
      console.error('Error loading theme:', error);
      // Fallback to system preference
      setThemeState('system');
    }
  };

  const setTheme = async (newTheme: Theme) => {
    try {
      console.log('Setting theme to:', newTheme);
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
      setThemeState(newTheme);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  const toggleTheme = () => {
    // Cycle through: system -> light -> dark -> system
    const themeCycle: Theme[] = ['system', 'light', 'dark'];
    const currentIndex = themeCycle.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themeCycle.length;
    setTheme(themeCycle[nextIndex]);
  };

  // Get the effective theme (resolves 'system' to actual light/dark)
  const getEffectiveTheme = (): 'light' | 'dark' => {
    if (theme === 'system') {
      // Enhanced system theme detection with better fallbacks
      let effective: 'light' | 'dark';
      
      if (systemColorScheme === 'dark') {
        effective = 'dark';
      } else if (systemColorScheme === 'light') {
        effective = 'light';
      } else {
        // Fallback for when useColorScheme returns null or undefined
        if (typeof window !== 'undefined') {
          // Web fallback using CSS media query
          const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
          effective = mediaQuery.matches ? 'dark' : 'light';
        } else {
          // Mobile fallback - default to light mode
          effective = 'light';
        }
      }
      
      console.log('System theme detection:', { 
        theme, 
        systemColorScheme, 
        effective,
        systemColorSchemeType: typeof systemColorScheme,
        platform: Platform.OS
      });
      return effective;
    }
    return theme;
  };

  const effectiveTheme = getEffectiveTheme();
  const colors = getThemeColors(effectiveTheme);
  const isDark = effectiveTheme === 'dark';

  console.log('ThemeContext render:', {
    theme,
    systemColorScheme,
    effectiveTheme,
    isDark,
    platform: Platform.OS
  });

  return (
    <ThemeContext.Provider
      value={{
        theme,
        isDark,
        colors,
        toggleTheme,
        setTheme,
        getEffectiveTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
