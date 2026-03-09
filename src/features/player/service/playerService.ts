import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
  RepeatMode,
  State,
} from 'react-native-track-player';
import {Station} from '../../../domain/entities/Station';
import {usePlayerStore} from '../store/playerStore';

let isSetup = false;

export const playerService = {
  async setup(): Promise<void> {
    if (isSetup) return;
    try {
      await TrackPlayer.setupPlayer({
        maxCacheSize: 1024 * 5, // 5MB
      });
      await TrackPlayer.updateOptions({
        android: {
          appKilledPlaybackBehavior:
            AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
        },
        capabilities: [Capability.Play, Capability.Pause, Capability.Stop],
        compactCapabilities: [Capability.Play, Capability.Pause],
        notificationCapabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.Stop,
        ],
      });
      await TrackPlayer.setRepeatMode(RepeatMode.Off);
      isSetup = true;
    } catch (error) {
      // Already setup
      isSetup = true;
    }
  },

  async play(station: Station): Promise<void> {
    const {setStatus} = usePlayerStore.getState();
    try {
      setStatus('loading');
      await TrackPlayer.reset();
      await TrackPlayer.add({
        id: station.id,
        url: station.streamUrl,
        title: station.name,
        artist: station.country || 'Live Radio',
        artwork: station.logoUrl ?? undefined,
        isLiveStream: true,
      });
      await TrackPlayer.play();

      // ← Add this to confirm it reached play()
      console.log('[Player] Now playing:', station.name, station.streamUrl);
      setStatus('playing');
    } catch (error) {
      console.error('[PlayerService] play error:', error);
      setStatus('error');
    }
  },

  async pause(): Promise<void> {
    try {
      await TrackPlayer.pause();
      usePlayerStore.getState().setStatus('paused');
    } catch (error) {
      console.error('[PlayerService] pause error:', error);
    }
  },

  async resume(): Promise<void> {
    try {
      await TrackPlayer.play();
      usePlayerStore.getState().setStatus('playing');
    } catch (error) {
      console.error('[PlayerService] resume error:', error);
    }
  },

  async stop(): Promise<void> {
    try {
      await TrackPlayer.reset();
      usePlayerStore.getState().setStatus('idle');
    } catch (error) {
      console.error('[PlayerService] stop error:', error);
    }
  },

  async getState(): Promise<State> {
    return await TrackPlayer.getState();
  },
};
