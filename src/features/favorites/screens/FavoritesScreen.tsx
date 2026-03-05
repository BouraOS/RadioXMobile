import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../../shared/hooks/useTheme';

export default function FavoritesScreen() {
  const { colors, typography, spacing } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <Text style={[typography.headingLg, { color: colors.text.primary }]}>Favorites</Text>
      <Text style={[typography.bodyMd, { color: colors.text.secondary, marginTop: spacing.sm }]}>Coming soon...</Text>
    </View>
  );
}
const styles = StyleSheet.create({ container: { flex: 1, justifyContent: 'center', alignItems: 'center' } });
