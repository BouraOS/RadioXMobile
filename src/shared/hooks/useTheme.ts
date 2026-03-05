import { useColorScheme } from 'react-native';
import { lightColors, darkColors } from '../theme/colors';
import { spacing, radius, hitSlop } from '../theme/spacing';
import { typography } from '../theme/typography';

export const useTheme = () => {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  const colors = isDark ? darkColors : lightColors;
  return { colors, spacing, radius, hitSlop, typography, isDark };
};

export type Theme = ReturnType<typeof useTheme>;
