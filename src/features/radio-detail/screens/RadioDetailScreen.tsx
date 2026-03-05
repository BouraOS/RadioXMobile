import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../app/navigation/types';
import { useTheme } from '../../../shared/hooks/useTheme';

type Props = NativeStackScreenProps<RootStackParamList, 'RadioDetail'>;

export default function RadioDetailScreen({ route }: Props) {
  const { colors, typography, spacing } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <Text style={[typography.headingLg, { color: colors.text.primary }]}>Station Detail</Text>
      <Text style={[typography.bodyMd, { color: colors.text.secondary, marginTop: spacing.sm }]}>
        ID: {route.params.stationId}
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({ container: { flex: 1, justifyContent: 'center', alignItems: 'center' } });
