import { Platform } from 'react-native';

const fontFamily = {
  regular: Platform.select({ ios: 'System', android: 'Roboto', default: 'System' }),
  medium:  Platform.select({ ios: 'System', android: 'Roboto-Medium', default: 'System' }),
  bold:    Platform.select({ ios: 'System', android: 'Roboto-Bold', default: 'System' }),
  mono:    Platform.select({ ios: 'Menlo', android: 'monospace', default: 'monospace' }),
};

export const typography = {
  // Display
  displayLg: { fontSize: 40, lineHeight: 48, fontWeight: '700' as const, fontFamily: fontFamily.bold },
  displayMd: { fontSize: 32, lineHeight: 40, fontWeight: '700' as const, fontFamily: fontFamily.bold },

  // Heading
  headingXl: { fontSize: 28, lineHeight: 36, fontWeight: '700' as const, fontFamily: fontFamily.bold },
  headingLg: { fontSize: 24, lineHeight: 32, fontWeight: '600' as const, fontFamily: fontFamily.bold },
  headingMd: { fontSize: 20, lineHeight: 28, fontWeight: '600' as const, fontFamily: fontFamily.bold },
  headingSm: { fontSize: 18, lineHeight: 26, fontWeight: '600' as const, fontFamily: fontFamily.bold },

  // Body
  bodyLg:  { fontSize: 16, lineHeight: 24, fontWeight: '400' as const, fontFamily: fontFamily.regular },
  bodyMd:  { fontSize: 14, lineHeight: 22, fontWeight: '400' as const, fontFamily: fontFamily.regular },
  bodySm:  { fontSize: 12, lineHeight: 18, fontWeight: '400' as const, fontFamily: fontFamily.regular },

  // Label
  labelLg: { fontSize: 16, lineHeight: 24, fontWeight: '500' as const, fontFamily: fontFamily.medium },
  labelMd: { fontSize: 14, lineHeight: 20, fontWeight: '500' as const, fontFamily: fontFamily.medium },
  labelSm: { fontSize: 12, lineHeight: 16, fontWeight: '500' as const, fontFamily: fontFamily.medium },

  // Caption
  caption: { fontSize: 11, lineHeight: 16, fontWeight: '400' as const, fontFamily: fontFamily.regular },

  // Mono
  mono: { fontSize: 13, lineHeight: 20, fontWeight: '400' as const, fontFamily: fontFamily.mono },
} as const;
