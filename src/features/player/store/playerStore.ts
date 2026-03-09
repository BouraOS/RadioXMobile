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

  play: (station: Station) => {
    set({ currentStation: station, status: 'loading' });
    // Import lazily to avoid circular dependency
    import('../service/playerService').then(({ playerService }) => {
      playerService.play(station);
    });
  },

  pause: () => {
    import('../service/playerService').then(({ playerService }) => {
      playerService.pause();
    });
  },

  resume: () => {
    import('../service/playerService').then(({ playerService }) => {
      playerService.resume();
    });
  },

  stop: () => {
    import('../service/playerService').then(({ playerService }) => {
      playerService.stop();
    });
    set({ currentStation: null, status: 'idle' });
  },

  setStatus: (status) => set({ status }),

  setQueue: (stations, startIndex = 0) => {
    set({
      queue: stations,
      queueIndex: startIndex,
      currentStation: stations[startIndex] ?? null,
      status: 'loading',
    });
    if (stations[startIndex]) {
      import('../service/playerService').then(({ playerService }) => {
        playerService.play(stations[startIndex]);
      });
    }
  },

  next: () => {
    const { queue, queueIndex } = get();
    const nextIndex = queueIndex + 1;
    if (nextIndex < queue.length) {
      set({ queueIndex: nextIndex, currentStation: queue[nextIndex], status: 'loading' });
      import('../service/playerService').then(({ playerService }) => {
        playerService.play(queue[nextIndex]);
      });
    }
  },

  previous: () => {
    const { queue, queueIndex } = get();
    const prevIndex = queueIndex - 1;
    if (prevIndex >= 0) {
      set({ queueIndex: prevIndex, currentStation: queue[prevIndex], status: 'loading' });
      import('../service/playerService').then(({ playerService }) => {
        playerService.play(queue[prevIndex]);
      });
    }
  },

  setVolume: (volume) => set({ volume }),
}));

// ─── Stable selector hooks ────────────────────────────────────────
// Always use these instead of subscribing to full store
export const useCurrentStation = () => usePlayerStore(s => s.currentStation);
export const usePlayerStatus   = () => usePlayerStore(s => s.status);
export const useIsPlaying      = () => usePlayerStore(s => s.status === 'playing');
export const useIsLoading      = () => usePlayerStore(s => s.status === 'loading');
export const usePlayerActions  = () => {
  const play     = usePlayerStore(s => s.play);
  const pause    = usePlayerStore(s => s.pause);
  const resume   = usePlayerStore(s => s.resume);
  const stop     = usePlayerStore(s => s.stop);
  const next     = usePlayerStore(s => s.next);
  const previous = usePlayerStore(s => s.previous);
  return { play, pause, resume, stop, next, previous };
};
