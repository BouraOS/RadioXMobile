import {StyleSheet, View} from 'react-native';
import {useTheme} from '../../../shared/hooks/useTheme';

const SkeletonCard = () => {
  const {colors, spacing, radius} = useTheme();
  return (
    <View
      style={[
        styles.skeletonCard,
        {
          backgroundColor: colors.surface.secondary,
          borderRadius: radius.md,
          marginBottom: spacing.sm,
        },
      ]}
    />
  );
};

export default SkeletonCard;

const styles = StyleSheet.create({
  // Skeleton
  skeletonCard: {
    height: 72,
  },
});
