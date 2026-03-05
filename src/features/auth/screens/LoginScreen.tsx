import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../app/navigation/types';
import { useTheme } from '../../../shared/hooks/useTheme';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'> & { onLogin: () => void };

export default function LoginScreen({ onLogin }: Props) {
  const { colors, typography, spacing, radius } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <Text style={{ fontSize: 64 }}>📻</Text>
      <Text style={[typography.displayMd, { color: colors.brand.default, marginTop: spacing.md }]}>
        RadioX
      </Text>
      <Text style={[typography.bodyLg, { color: colors.text.secondary, marginTop: spacing.sm }]}>
        Discover the world's radio
      </Text>
      <TouchableOpacity
        onPress={onLogin}
        style={[styles.button, {
          backgroundColor: colors.brand.default,
          borderRadius: radius.md,
          marginTop: spacing.xxl,
          paddingHorizontal: spacing.xl,
          paddingVertical: spacing.md,
        }]}
      >
        <Text style={[typography.labelLg, { color: colors.brand.contrast }]}>
          Get Started
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  button: { alignItems: 'center' },
});
