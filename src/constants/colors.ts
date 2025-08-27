export const COLORS = {
  // Light theme colors
  LIGHT: {
    // Primary liturgical colors
    PRIMARY: '#8B0000', // Liturgical red
    SECONDARY: '#4B0082', // Royal purple
    ACCENT: '#DAA520', // Liturgical gold
    
    // Background and text
    BACKGROUND: '#F5F5F5', // Neutral grey
    CARD_BACKGROUND: '#F5F5F0', // soft grey
    TEXT: '#2F2F2F', // Charcoal
    TEXT_LIGHT: '#6B6B6B',
    TEXT_WHITE: '#FFFFFF',
    
    // UI elements
    BORDER: '#E0E0E0',
    SHADOW: '#000000',
    OVERLAY: 'rgba(0, 0, 0, 0.5)',
    
    // Status colors
    SUCCESS: '#28A745',
    WARNING: '#FFC107',
    ERROR: '#DC3545',
    INFO: '#17A2B8',
    
    // Transparent variants
    PRIMARY_TRANSPARENT: 'rgba(139, 0, 0, 0.1)',
    SECONDARY_TRANSPARENT: 'rgba(75, 0, 130, 0.1)',
    ACCENT_TRANSPARENT: 'rgba(218, 165, 32, 0.1)',
  },
  
  // Dark theme colors
  DARK: {
    // Primary liturgical colors (same as light)
    PRIMARY: '#8B0000', // Liturgical red
    SECONDARY: '#4B0082', // Royal purple
    ACCENT: '#DAA520', // Liturgical gold
    
    // Background and text
    BACKGROUND: '#1A1A1A', // Dark grey
    CARD_BACKGROUND: '#2D2D2D', // Darker grey
    TEXT: '#FFFFFF', // White
    TEXT_LIGHT: '#B0B0B0',
    TEXT_WHITE: '#FFFFFF',
    
    // UI elements
    BORDER: '#404040',
    SHADOW: '#000000',
    OVERLAY: 'rgba(0, 0, 0, 0.7)',
    
    // Status colors (same as light)
    SUCCESS: '#28A745',
    WARNING: '#FFC107',
    ERROR: '#DC3545',
    INFO: '#17A2B8',
    
    // Transparent variants
    PRIMARY_TRANSPARENT: 'rgba(139, 0, 0, 0.2)',
    SECONDARY_TRANSPARENT: 'rgba(75, 0, 130, 0.2)',
    ACCENT_TRANSPARENT: 'rgba(218, 165, 32, 0.2)',
  },
  
  // Liturgical season colors (same for both themes)
  ADVENT: '#4B0082', // Purple
  CHRISTMAS: '#FFFFFF', // White
  LENT: '#8B008B', // Violet
  EASTER: '#FFFFFF', // White
  ORDINARY_TIME: '#2E8B57', // Green
  PENTECOST: '#FF0000', // Red
} as const;

export type ColorKey = keyof typeof COLORS.LIGHT;
export type Theme = 'light' | 'dark' | 'system';

// Helper function to get theme-aware colors
export const getThemeColors = (theme: 'light' | 'dark') => {
  return COLORS[theme.toUpperCase() as keyof typeof COLORS] as typeof COLORS.LIGHT;
};
