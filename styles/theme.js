import { Platform } from 'react-native';

// Modern, neutral palette with strong accent and clean tokens
export const COLORS = {
  background: '#F8FAFC', // soft neutral app background
  surface: '#FFFFFF',
  card: '#FFFFFF',
  primary: '#2B3674', // deep indigo (primary)
  primaryAccent: '#3B82F6', // electric blue accent
  navy: '#1F2937',
  accent: '#0EA5E9',
  text: '#334155', // slate gray
  subtext: '#475569',
  muted: '#94A3B8',
  border: '#E6EEF6',
  guidanceBg: '#F1F5F9',
  success: '#10B981',
  danger: '#EF4444',
  transparent: 'transparent',
};

// keep a primaryDark token for compatibility with older components
COLORS.primaryDark = '#1B2450';

// 8pt spacing scale
export const SIZES = {
  spacing: 8,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  radius: 14,
  cardRadius: 14,
  scoreButton: 56,
};

// Backwards-compatible aliases for existing code that used older tokens
SIZES.base = 12;
SIZES.small = SIZES.sm;
SIZES.medium = SIZES.md;
SIZES.large = SIZES.lg;
SIZES.radius = SIZES.radius || 14;

export const TYPOGRAPHY = {
  // prefer Inter / SF Pro Display — provide explicit fallbacks for all platforms (including web)
  // styled-components/native expects a string here; avoid undefined on web by providing a default.
  fontFamily: Platform.select({ ios: 'Inter', android: 'Inter', default: 'System' }),
  h1: 28,
  h2: 22,
  h3: 18,
  h6: 16,
  bodyStrong: 15,
  body: 16,
  small: 14,
  label: 13,
  weight: {
    regular: '400',
    medium: '600',
    bold: '700',
  },
};

export const SHADOW = {
  subtle: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.06,
      shadowRadius: 16,
    },
    android: {
      elevation: 3,
    },
  }),
  elevated: Platform.select({
    ios: {
      shadowColor: '#0b1020',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.08,
      shadowRadius: 24,
    },
    android: {
      elevation: 6,
    },
  }),
};

export default {
  COLORS,
  SIZES,
  TYPOGRAPHY,
  SHADOW,
};
