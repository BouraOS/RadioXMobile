import React, {useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {useQuery} from '@tanstack/react-query';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTheme} from '../../../shared/hooks/useTheme';
import {radioBrowserApi} from '../../../data/api/radioBrowserApi';
import {stationMapper} from '../../../data/mappers/stationMapper';
import {Station} from '../../../domain/entities/Station';
import {RootStackParamList} from '../../../app/navigation/types';
import StationCard from '../components/StationCard';
import SectionHeader from '../components/SectionHeader';
import SkeletonCard from '../components/SkeletonCard';

type NavProp = NativeStackNavigationProp<RootStackParamList>;

export default function HomeScreen() {
  const {colors, spacing, typography} = useTheme();
  const insets = useSafeAreaInsets(); // Get the current device insets

  const navigation = useNavigation<NavProp>();

  // Fetch top stations
  const {
    data: topStations,
    isLoading: loadingTop,
    isError: errorTop,
    refetch: refetchTop,
    isRefetching,
  } = useQuery({
    queryKey: ['stations', 'top'],
    queryFn: async () => {
      const dtos = await radioBrowserApi.getTopStations(20);
      return stationMapper.fromDTOList(dtos);
    },
  });

  // Fetch trending (different endpoint params for variety)
  const {data: trendingStations, isLoading: loadingTrending} = useQuery({
    queryKey: ['stations', 'trending'],
    queryFn: async () => {
      const dtos = await radioBrowserApi.searchStations({
        tag: 'pop',
        limit: 10,
      });
      return stationMapper.fromDTOList(dtos);
    },
  });

  const handleStationPress = useCallback(
    (station: Station) => {
      navigation.navigate('RadioDetail', {stationId: station.id});
    },
    [navigation],
  );

  const isLoading = loadingTop || loadingTrending;

  // ── Error state ───────────────────────────────────────────────
  if (errorTop) {
    return (
      <View
        style={[styles.centered, {backgroundColor: colors.background.primary}]}>
        <Text style={{fontSize: 48}}>📡</Text>
        <Text
          style={[
            typography.headingMd,
            {color: colors.text.primary, marginTop: spacing.md},
          ]}>
          Connection Error
        </Text>
        <Text
          style={[
            typography.bodyMd,
            {
              color: colors.text.secondary,
              marginTop: spacing.sm,
              textAlign: 'center',
            },
          ]}>
          Could not reach the radio server.{'\n'}Check your connection and try
          again.
        </Text>
        <TouchableOpacity
          onPress={() => refetchTop()}
          style={[
            styles.retryBtn,
            {
              backgroundColor: colors.brand.default,
              borderRadius: 12,
              marginTop: spacing.lg,
            },
          ]}>
          <Text style={[typography.labelMd, {color: colors.brand.contrast}]}>
            Retry
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ── Main render ───────────────────────────────────────────────
  return (
    <View style={{flex: 1, backgroundColor: colors.background.primary}}>
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{
          paddingTop: insets.top,
          paddingHorizontal: spacing.md,
          paddingBottom: insets.bottom,
        }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetchTop}
            tintColor={colors.brand.default}
          />
        }>
        {/* ── Header ── */}
        <View style={[styles.header, {paddingTop: spacing.md}]}>
          <View>
            <Text style={[typography.headingXl, {color: colors.text.primary}]}>
              RadioX 📻
            </Text>
            <Text style={[typography.bodyMd, {color: colors.text.secondary}]}>
              Discover live radio worldwide
            </Text>
          </View>
          <TouchableOpacity
            style={[
              styles.searchBtn,
              {backgroundColor: colors.surface.secondary, borderRadius: 12},
            ]}>
            <Text style={{fontSize: 20}}>🔍</Text>
          </TouchableOpacity>
        </View>

        {/* ── Featured / Top Stations (horizontal scroll) ── */}
        <SectionHeader
          title="🔥 Top Stations"
          subtitle="Most listened right now"
        />

        {isLoading ? (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[1, 2, 3].map(i => (
              <View
                key={i}
                style={[
                  styles.featuredSkeleton,
                  {
                    backgroundColor: colors.surface.secondary,
                    borderRadius: 16,
                    marginRight: spacing.md,
                  },
                ]}
              />
            ))}
          </ScrollView>
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingRight: spacing.md}}>
            {topStations?.slice(0, 8).map(station => (
              <StationCard
                key={station.id}
                station={station}
                onPress={handleStationPress}
                variant="featured"
              />
            ))}
          </ScrollView>
        )}

        {/* ── Trending Now ── */}
        <SectionHeader
          title="📈 Trending Now"
          subtitle="Popular across all genres"
        />

        {isLoading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          trendingStations
            ?.slice(0, 8)
            .map(station => (
              <StationCard
                key={station.id}
                station={station}
                onPress={handleStationPress}
                variant="list"
              />
            ))
        )}

        {/* ── All Stations ── */}
        <SectionHeader
          title="🌍 All Stations"
          subtitle={`${topStations?.length ?? 0} stations loaded`}
        />

        {isLoading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          topStations
            ?.slice(8)
            .map(station => (
              <StationCard
                key={station.id}
                station={station}
                onPress={handleStationPress}
                variant="list"
              />
            ))
        )}
      </ScrollView>
    </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  searchBtn: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },

  // Featured card
  featuredSkeleton: {
    width: 200,
    height: 180,
  },

  // Retry button
  retryBtn: {
    paddingHorizontal: 32,
    paddingVertical: 14,
  },
});
