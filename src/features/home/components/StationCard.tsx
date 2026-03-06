import React, {memo} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Station} from '../../../domain/entities/Station';
import {useTheme} from '../../../shared/hooks/useTheme';

interface StationCardProps {
  station: Station;
  onPress: (station: Station) => void;
  variant?: 'featured' | 'list';
}

const StationCard = memo(
  ({station, onPress, variant = 'list'}: StationCardProps) => {
    const {colors, spacing, radius, typography} = useTheme();

    if (variant === 'featured') {
      return (
        <TouchableOpacity
          onPress={() => onPress(station)}
          style={[
            styles.featuredCard,
            {
              backgroundColor: colors.surface.primary,
              borderRadius: radius.lg,
              marginRight: spacing.md,
              borderWidth: 1,
              borderColor: colors.border.subtle,
            },
          ]}
          activeOpacity={0.8}>
          {/* Logo */}
          <View
            style={[
              styles.featuredLogo,
              {backgroundColor: colors.brand.light, borderRadius: radius.md},
            ]}>
            {station.logoUrl ? (
              <Image
                source={{uri: station.logoUrl}}
                style={styles.featuredLogoImage}
              />
            ) : (
              <Text style={styles.logoEmoji}>📻</Text>
            )}
          </View>

          {/* Info */}
          <View style={{padding: spacing.md, flex: 1}}>
            <Text
              style={[typography.labelLg, {color: colors.text.primary}]}
              numberOfLines={1}>
              {station.name}
            </Text>
            <Text
              style={[
                typography.bodySm,
                {color: colors.text.secondary, marginTop: 2},
              ]}
              numberOfLines={1}>
              {station.genres.slice(0, 2).join(' · ') || 'Radio'}
            </Text>
            <View style={styles.row}>
              <View
                style={[
                  styles.badge,
                  {
                    backgroundColor: colors.brand.light,
                    borderRadius: radius.xs,
                  },
                ]}>
                <Text
                  style={[typography.caption, {color: colors.brand.default}]}>
                  {station.countryCode || '🌍'}
                </Text>
              </View>
              {station.bitrate > 0 && (
                <Text
                  style={[
                    typography.caption,
                    {color: colors.text.tertiary, marginLeft: spacing.xs},
                  ]}>
                  {station.bitrate}kbps
                </Text>
              )}
            </View>
          </View>

          {/* Play button */}
          <View
            style={[
              styles.playBtn,
              {
                backgroundColor: colors.brand.default,
                borderRadius: radius.full,
              },
            ]}>
            <Text style={{color: colors.brand.contrast, fontSize: 12}}>▶</Text>
          </View>
        </TouchableOpacity>
      );
    }

    // List variant
    return (
      <TouchableOpacity
        onPress={() => onPress(station)}
        style={[
          styles.listCard,
          {
            backgroundColor: colors.surface.primary,
            borderRadius: radius.md,
            marginBottom: spacing.sm,
            borderWidth: 1,
            borderColor: colors.border.subtle,
            padding: spacing.md,
          },
        ]}
        activeOpacity={0.8}>
        {/* Logo */}
        <View
          style={[
            styles.listLogo,
            {backgroundColor: colors.brand.light, borderRadius: radius.sm},
          ]}>
          {station.logoUrl ? (
            <Image
              source={{uri: station.logoUrl}}
              style={styles.listLogoImage}
            />
          ) : (
            <Text style={{fontSize: 24}}>📻</Text>
          )}
        </View>

        {/* Info */}
        <View style={styles.listInfo}>
          <Text
            style={[typography.labelMd, {color: colors.text.primary}]}
            numberOfLines={1}>
            {station.name}
          </Text>
          <Text
            style={[typography.bodySm, {color: colors.text.secondary}]}
            numberOfLines={1}>
            {station.genres.slice(0, 2).join(' · ') || 'Radio'}
            {station.country ? ` · ${station.country}` : ''}
          </Text>
        </View>

        {/* Right side */}
        <View style={styles.listRight}>
          {station.isOnline && (
            <View
              style={[
                styles.liveIndicator,
                {backgroundColor: colors.status.success},
              ]}
            />
          )}
          <Text style={[typography.caption, {color: colors.text.tertiary}]}>
            ▶
          </Text>
        </View>
      </TouchableOpacity>
    );
  },
);

export default StationCard;
// ─── Styles ──────────────────────────────────────────────────────
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  badge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
  },

  // Featured card
  featuredCard: {
    width: 200,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  featuredLogo: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  featuredLogoImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  logoEmoji: {
    fontSize: 48,
  },
  playBtn: {
    position: 'absolute',
    bottom: 52,
    right: 12,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featuredSkeleton: {
    width: 200,
    height: 180,
  },

  // List card
  listCard: {
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  listLogo: {
    width: 52,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  listLogoImage: {
    width: 52,
    height: 52,
    resizeMode: 'cover',
  },
  listInfo: {
    flex: 1,
    marginLeft: 12,
    gap: 4,
  },
  listRight: {
    alignItems: 'center',
    gap: 4,
  },
  liveIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
