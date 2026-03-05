import AsyncStorage from '@react-native-async-storage/async-storage';
import { Playlist } from '../../domain/entities/Playlist';

const KEY = '@radiox/playlists';

export const playlistStorage = {
  async getAll(): Promise<Playlist[]> {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  },
  async save(playlists: Playlist[]): Promise<void> {
    await AsyncStorage.setItem(KEY, JSON.stringify(playlists));
  },
  async add(playlist: Playlist): Promise<void> {
    const current = await playlistStorage.getAll();
    await playlistStorage.save([...current, playlist]);
  },
  async update(updated: Playlist): Promise<void> {
    const current = await playlistStorage.getAll();
    await playlistStorage.save(current.map(p => p.id === updated.id ? updated : p));
  },
  async remove(id: string): Promise<void> {
    const current = await playlistStorage.getAll();
    await playlistStorage.save(current.filter(p => p.id !== id));
  },
};
