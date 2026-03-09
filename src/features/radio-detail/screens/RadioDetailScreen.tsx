import React, {useCallback, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import {useQuery} from '@tanstack/react-query';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTheme} from '../../../shared/hooks/useTheme';
import {RootStackParamList} from '../../../app/navigation/types';
import {radioBrowserApi} from '../../../data/api/radioBrowserApi';
import {stationMapper} from '../../../data/mappers/stationMapper';
import {
  usePlayerStore,
  useCurrentStation,
  useIsPlaying,
} from '../../player/store/playerStore';

type Props = NativeStackScreenProps<RootStackParamList, 'RadioDetail'>;

// ─── Metadata Row ────────────────────────────────────────────────
const MetaRow = ({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) => {
  const {colors, typography, spacing} = useTheme();
  if (!value) return null;
  return (
    <View style={[styles.metaRow, {borderBottomColor: colors.border.subtle}]}>
      <Text style={styles.metaIcon}>{icon}</Text>
      <View style={styles.metaContent}>
        <Text style={[typography.caption, {color: colors.text.tertiary}]}>
          {label}
        </Text>
        <Text style={[typography.bodyMd, {color: colors.text.primary}]}>
          {value}
        </Text>
      </View>
    </View>
  );
};

// ─── Genre Tag ───────────────────────────────────────────────────
const GenreTag = ({genre}: {genre: string}) => {
  const {colors, typography, spacing, radius} = useTheme();
  return (
    <View
      style={[
        styles.tag,
        {backgroundColor: colors.brand.light, borderRadius: radius.full},
      ]}>
      <Text style={[typography.labelSm, {color: colors.brand.default}]}>
        {genre}
      </Text>
    </View>
  );
};

// ─── Main Screen ─────────────────────────────────────────────────
export default function RadioDetailScreen({route, navigation}: Props) {
  const {stationId} = route.params;
  const {colors, typography, spacing, radius} = useTheme();

  // Player store
  const play = usePlayerStore(s => s.play);
  const pause = usePlayerStore(s => s.pause);
  const resume = usePlayerStore(s => s.resume);
  const unavailable = usePlayerStore(s => s.status) === 'error';
  const currentStation = useCurrentStation();
  const isPlaying = useIsPlaying();
  const isThisStation = currentStation?.id === stationId;
  const isThisPlaying = isThisStation && isPlaying;

  // Fetch station detail
  const {
    data: station,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['station', stationId],
    queryFn: async () => {
      const dto = await radioBrowserApi.getStationById(stationId);
      if (!dto) throw new Error('Station not found');
      return stationMapper.fromDTO(dto);
    },
  });

  // Set navigation title
  useEffect(() => {
    if (station?.name) {
      navigation.setOptions({title: station.name});
    }
  }, [station?.name, navigation]);

  const handlePlayPause = useCallback(() => {
    console.log('Play/pause pressed for station:', station);
    console.log('Is this station:', isThisStation);
    if (!station) return;
    if (isThisStation) {
      console.log('Is playing:', isPlaying);
      isPlaying ? pause() : resume();
    } else {
      play(station);
      radioBrowserApi.recordClick(stationId);
    }
  }, [station, isThisStation, isPlaying, play, pause, resume, stationId]);

  // ── Loading ───────────────────────────────────────────────────
  if (isLoading) {
    return (
      <View
        style={[styles.centered, {backgroundColor: colors.background.primary}]}>
        <ActivityIndicator size="large" color={colors.brand.default} />
        <Text
          style={[
            typography.bodyMd,
            {color: colors.text.secondary, marginTop: spacing.md},
          ]}>
          Loading station...
        </Text>
      </View>
    );
  }

  // ── Error ─────────────────────────────────────────────────────
  if (isError || !station) {
    return (
      <View
        style={[styles.centered, {backgroundColor: colors.background.primary}]}>
        <Text style={{fontSize: 48}}>📡</Text>
        <Text
          style={[
            typography.headingMd,
            {color: colors.text.primary, marginTop: spacing.md},
          ]}>
          Station Not Found
        </Text>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}>
          <Text style={[typography.labelMd, {color: colors.brand.default}]}>
            ← Go Back
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  const playButtonLabel = isThisPlaying ? '⏸' : '▶';
  const playButtonText = isThisPlaying
    ? 'Pause'
    : isThisStation
    ? 'Resume'
    : 'Play Station';

  // ── Main Render ───────────────────────────────────────────────
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: colors.background.primary}}
      edges={['bottom']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 120}}>
        {/* ── Hero Section ── */}
        <View style={[styles.hero, {backgroundColor: colors.brand.light}]}>
          <View
            style={[
              styles.logoContainer,
              {
                backgroundColor: colors.surface.primary,
                borderRadius: radius.xl,
              },
            ]}>
            {station.logoUrl ? (
              <Image
                source={{uri: station.logoUrl}}
                style={[styles.logo, {borderRadius: radius.lg}]}
                resizeMode="contain"
              />
            ) : (
              <Text style={styles.logoFallback}>📻</Text>
            )}
          </View>

          {/* Live badge */}
          {station.isOnline && (
            <View
              style={[
                styles.liveBadge,
                {
                  backgroundColor: colors.status.success,
                  borderRadius: radius.full,
                },
              ]}>
              <View style={styles.liveDot} />
              <Text style={[typography.labelSm, {color: '#fff'}]}>LIVE</Text>
            </View>
          )}
        </View>

        {/* ── Station Info ── */}
        <View style={[styles.infoSection, {paddingHorizontal: spacing.lg}]}>
          <Text
            style={[
              typography.headingXl,
              {color: colors.text.primary, marginTop: spacing.lg},
            ]}>
            {station.name}
          </Text>

          {station.country ? (
            <Text
              style={[
                typography.bodyLg,
                {color: colors.text.secondary, marginTop: spacing.xs},
              ]}>
              📍 {station.country}
            </Text>
          ) : null}

          {/* Genre tags */}
          {station.genres.length > 0 && (
            <View style={[styles.tagRow, {marginTop: spacing.md}]}>
              {station.genres.slice(0, 5).map(genre => (
                <GenreTag key={genre} genre={genre} />
              ))}
            </View>
          )}

          {/* ── Play Button ── */}
          <TouchableOpacity
            onPress={handlePlayPause}
            style={[
              styles.playButton,
              {
                backgroundColor: isThisPlaying
                  ? colors.surface.secondary
                  : colors.brand.default,
                borderRadius: radius.md,
                marginTop: spacing.lg,
                borderWidth: isThisPlaying ? 2 : 0,
                borderColor: colors.brand.default,
              },
            ]}
            activeOpacity={0.85}>
            <Text style={{fontSize: 24}}>{playButtonLabel}</Text>
            <Text
              style={[
                typography.labelLg,
                {
                  color: isThisPlaying
                    ? colors.brand.default
                    : colors.brand.contrast,
                  marginLeft: spacing.sm,
                },
              ]}>
              {playButtonText}
            </Text>
          </TouchableOpacity>

          {/* Error state */}
          {isThisStation && unavailable && (
            <View
              style={[
                styles.nowPlayingBar,
                {
                  backgroundColor: colors.status.error + '20',
                  borderRadius: radius.sm,
                  marginTop: spacing.sm,
                },
              ]}>
              <Text>⚠️</Text>
              <Text
                style={[
                  typography.labelSm,
                  {color: colors.status.error, marginLeft: spacing.xs},
                ]}>
                Stream unavailable — try another station
              </Text>
            </View>
          )}

          {/* Now playing indicator */}
          {isThisStation && (
            <View
              style={[
                styles.nowPlayingBar,
                {
                  backgroundColor: colors.brand.light,
                  borderRadius: radius.sm,
                  marginTop: spacing.sm,
                },
              ]}>
              <Text style={{fontSize: 16}}>{isThisPlaying ? '🎵' : '⏸'}</Text>
              <Text
                style={[
                  typography.labelSm,
                  {color: colors.brand.default, marginLeft: spacing.xs},
                ]}>
                {isThisPlaying ? 'Now playing in player' : 'Paused'}
              </Text>
            </View>
          )}
        </View>

        {/* ── Divider ── */}
        <View
          style={[
            styles.divider,
            {backgroundColor: colors.border.subtle, marginVertical: spacing.lg},
          ]}
        />

        {/* ── Metadata ── */}
        <View style={{paddingHorizontal: spacing.lg}}>
          <Text
            style={[
              typography.headingSm,
              {color: colors.text.primary, marginBottom: spacing.md},
            ]}>
            Station Info
          </Text>

          <View
            style={[
              styles.metaCard,
              {
                backgroundColor: colors.surface.secondary,
                borderRadius: radius.md,
              },
            ]}>
            <MetaRow icon="🌍" label="Country" value={station.country} />
            <MetaRow icon="🗣" label="Language" value={station.language} />
            <MetaRow
              icon="🎵"
              label="Codec"
              value={station.codec?.toUpperCase()}
            />
            <MetaRow
              icon="📶"
              label="Bitrate"
              value={station.bitrate ? `${station.bitrate} kbps` : ''}
            />
            <MetaRow
              icon="👥"
              label="Total Plays"
              value={
                station.listenerCount
                  ? `${station.listenerCount.toLocaleString()} clicks`
                  : ''
              }
            />
            <MetaRow
              icon="⭐"
              label="Rating"
              value={station.rating ? `${station.rating} votes` : ''}
            />
          </View>

          {/* Homepage link */}
          {station.homepage ? (
            <View style={[styles.homepageRow, {marginTop: spacing.md}]}>
              <Text style={[typography.bodyMd, {color: colors.text.secondary}]}>
                🔗{' '}
              </Text>
              <Text
                style={[typography.bodyMd, {color: colors.brand.default}]}
                numberOfLines={1}>
                {station.homepage}
              </Text>
            </View>
          ) : null}
        </View>

        {/* ── Stream URL (for devs) ── */}
        {__DEV__ && (
          <View style={{paddingHorizontal: spacing.lg, marginTop: spacing.lg}}>
            <Text style={[typography.caption, {color: colors.text.tertiary}]}>
              Stream URL (dev only):
            </Text>
            <Text
              style={[typography.caption, {color: colors.text.tertiary}]}
              numberOfLines={2}>
              {station.streamUrl}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ──────────────────────────────────────────────────────
const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  hero: {
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    width: 130,
    height: 130,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  logo: {
    width: 120,
    height: 120,
  },
  logoFallback: {
    fontSize: 64,
  },
  liveBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    gap: 4,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#fff',
  },
  infoSection: {
    alignItems: 'flex-start',
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    width: '100%',
  },
  nowPlayingBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    width: '100%',
    justifyContent: 'center',
  },
  divider: {
    height: 1,
    marginHorizontal: 24,
  },
  metaCard: {
    overflow: 'hidden',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    gap: 12,
  },
  metaIcon: {
    fontSize: 20,
    width: 28,
    textAlign: 'center',
  },
  metaContent: {
    flex: 1,
    gap: 2,
  },
  homepageRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backBtn: {
    marginTop: 16,
    padding: 12,
  },
});
