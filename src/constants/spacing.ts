export const SPACING = {
  // Base spacing units
  XS: 4,
  SM: 8,
  MD: 16,
  LG: 24,
  XL: 32,
  XXL: 48,
  XXXL: 64,
  
  // Component-specific spacing
  CARD_PADDING: 16,
  CARD_MARGIN: 8,
  SECTION_PADDING: 24,
  HEADER_PADDING: 16,
  BUTTON_PADDING: 12,
  INPUT_PADDING: 12,
  
  // Border radius
  BORDER_RADIUS_SM: 4,
  BORDER_RADIUS_MD: 8,
  BORDER_RADIUS_LG: 12,
  BORDER_RADIUS_XL: 16,
  BORDER_RADIUS_ROUND: 50,
  
  // Shadows
  SHADOW_SM: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  SHADOW_MD: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  SHADOW_LG: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  
  // Layout
  CONTAINER_PADDING: 16,
  SCREEN_PADDING: 16,
  BOTTOM_TAB_HEIGHT: 60,
  HEADER_HEIGHT: 56,
  FEAST_BANNER_HEIGHT: 80,
} as const;
