import { create } from 'zustand';
import { Station } from '../../../domain/entities/Station';

type PlayerStatus = 'idle' | 'loading' | 'playing' | 'paused' | 'error';

interface PlayerState {
  currentStation: Station | null;
  status: PlayerStatus;
  volume: number;
  queue: Station[];
  queueIndex: number;

  // Actions
  play: (station: Station) => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  setStatus: (status: PlayerStatus) => void;
  setQueue: (stations: Station[], startIndex?: number) => void;
  next: () => void;
  previous: () => void;
  setVolume: (volume: number) => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  currentStation: null,
  status: 'idle',
  volume: 1,
  queue: [],
  queueIndex: 0,

  play: (station) => set({
    currentStation: station,
    status: 'loading',
  }),

  pause: () => set({ status: 'paused' }),

  resume: () => set({ status: 'playing' }),

  stop: () => set({
    currentStation: null,
    status: 'idle',
  }),

  setStatus: (status) => set({ status }),

  setQueue: (stations, startIndex = 0) => set({
    queue: stations,
    queueIndex: startIndex,
    currentStation: stations[startIndex] ?? null,
    status: 'loading',
  }),

  next: () => {
    const { queue, queueIndex } = get();
    const nextIndex = queueIndex + 1;
    if (nextIndex < queue.length) {
      set({ queueIndex: nextIndex, currentStation: queue[nextIndex], status: 'loading' });
    }
  },

  previous: () => {
    const { queue, queueIndex } = get();
    const prevIndex = queueIndex - 1;
    if (prevIndex >= 0) {
      set({ queueIndex: prevIndex, currentStation: queue[prevIndex], status: 'loading' });
    }
  },

  setVolume: (volume) => set({ volume }),
}));

// Selector hooks — use these to avoid unnecessary re-renders
export const useCurrentStation = () => usePlayerStore(s => s.currentStation);
export const usePlayerStatus  = () => usePlayerStore(s => s.status);
export const useIsPlaying     = () => usePlayerStore(s => s.status === 'playing');
export const usePlayerActions = () => usePlayerStore(s => ({
  play: s.play, pause: s.pause, resume: s.resume,
  stop: s.stop, next: s.next, previous: s.previous,
}));
