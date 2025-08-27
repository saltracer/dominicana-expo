import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { SPACING } from '../constants/spacing';

interface ThemeToggleProps {
  size?: number;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ size = 24 }) => {
  const { theme, toggleTheme, colors } = useTheme();

  const getThemeIcon = () => {
    switch (theme) {
      case 'system':
        return 'settings';
      case 'light':
        return 'sunny';
      case 'dark':
        return 'moon';
      default:
        return 'settings';
    }
  };

  const getThemeColor = () => {
    switch (theme) {
      case 'system':
        return colors.SECONDARY;
      case 'light':
        return colors.ACCENT;
      case 'dark':
        return colors.PRIMARY;
      default:
        return colors.SECONDARY;
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: colors.CARD_BACKGROUND }]}
      onPress={toggleTheme}
      activeOpacity={0.7}
    >
      <Ionicons
        name={getThemeIcon()}
        size={size}
        color={getThemeColor()}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default ThemeToggle;
