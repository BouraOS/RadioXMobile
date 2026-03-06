import {View, Text} from 'react-native';
import {useTheme} from '../../../shared/hooks/useTheme';

const SectionHeader = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) => {
  const {colors, typography, spacing} = useTheme();
  return (
    <View style={{marginBottom: spacing.md, marginTop: spacing.lg}}>
      <Text style={[typography.headingMd, {color: colors.text.primary}]}>
        {title}
      </Text>
      {subtitle && (
        <Text
          style={[
            typography.bodySm,
            {color: colors.text.secondary, marginTop: 2},
          ]}>
          {subtitle}
        </Text>
      )}
    </View>
  );
};

export default SectionHeader;
