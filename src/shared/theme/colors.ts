export const palette = {
  // Brand
  purple100: '#EDE9FF',
  purple200: '#C4B8FF',
  purple400: '#8B7CF8',
  purple500: '#6C63FF',
  purple600: '#5A52D5',
  purple700: '#4840B0',

  // Neutrals
  gray50:  '#F9F9FB',
  gray100: '#F0F0F5',
  gray200: '#E0E0EA',
  gray300: '#C8C8D8',
  gray400: '#9898B0',
  gray500: '#6B6B85',
  gray600: '#4A4A62',
  gray700: '#2E2E45',
  gray800: '#1E1E30',
  gray900: '#12121E',

  // Semantic
  green400: '#34D399',
  green500: '#10B981',
  amber400: '#FBBF24',
  amber500: '#F59E0B',
  red400:   '#F87171',
  red500:   '#EF4444',
  teal400:  '#22D3EE',
  teal500:  '#06B6D4',

  // Absolute
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
};

export type ThemeColors = typeof lightColors;

export const lightColors = {
  // Backgrounds
  background: {
    primary:   palette.white,
    secondary: palette.gray50,
    tertiary:  palette.gray100,
    elevated:  palette.white,
    overlay:   'rgba(0,0,0,0.5)',
  },
  // Surfaces (cards, sheets)
  surface: {
    primary:   palette.white,
    secondary: palette.gray50,
    elevated:  palette.white,
  },
  // Text
  text: {
    primary:   palette.gray900,
    secondary: palette.gray500,
    tertiary:  palette.gray400,
    inverse:   palette.white,
    link:      palette.purple500,
  },
  // Brand
  brand: {
    default:  palette.purple500,
    light:    palette.purple100,
    dark:     palette.purple700,
    contrast: palette.white,
  },
  // Border
  border: {
    default: palette.gray200,
    subtle:  palette.gray100,
    focus:   palette.purple500,
  },
  // Status
  status: {
    success: palette.green500,
    warning: palette.amber500,
    error:   palette.red500,
    info:    palette.teal500,
  },
  // Player
  player: {
    background: palette.gray900,
    surface:    palette.gray800,
    text:       palette.white,
    subtext:    palette.gray400,
    accent:     palette.purple400,
    progress:   palette.purple500,
    progressBg: palette.gray700,
  },
  // Tab bar
  tabBar: {
    background: palette.white,
    active:     palette.purple500,
    inactive:   palette.gray400,
    border:     palette.gray200,
  },
};

export const darkColors: ThemeColors = {
  background: {
    primary:   palette.gray900,
    secondary: palette.gray800,
    tertiary:  palette.gray700,
    elevated:  palette.gray800,
    overlay:   'rgba(0,0,0,0.7)',
  },
  surface: {
    primary:   palette.gray800,
    secondary: palette.gray700,
    elevated:  palette.gray700,
  },
  text: {
    primary:   palette.white,
    secondary: palette.gray300,
    tertiary:  palette.gray400,
    inverse:   palette.gray900,
    link:      palette.purple400,
  },
  brand: {
    default:  palette.purple400,
    light:    palette.purple700,
    dark:     palette.purple200,
    contrast: palette.white,
  },
  border: {
    default: palette.gray700,
    subtle:  palette.gray800,
    focus:   palette.purple400,
  },
  status: {
    success: palette.green400,
    warning: palette.amber400,
    error:   palette.red400,
    info:    palette.teal400,
  },
  player: {
    background: palette.black,
    surface:    palette.gray900,
    text:       palette.white,
    subtext:    palette.gray400,
    accent:     palette.purple400,
    progress:   palette.purple400,
    progressBg: palette.gray700,
  },
  tabBar: {
    background: palette.gray900,
    active:     palette.purple400,
    inactive:   palette.gray500,
    border:     palette.gray800,
  },
};
