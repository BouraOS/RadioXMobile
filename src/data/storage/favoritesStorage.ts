import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = '@radiox/favorites';

export const favoritesStorage = {
  async getAll(): Promise<string[]> {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  },
  async save(ids: string[]): Promise<void> {
    await AsyncStorage.setItem(KEY, JSON.stringify(ids));
  },
  async add(id: string): Promise<void> {
    const current = await favoritesStorage.getAll();
    if (!current.includes(id)) {
      await favoritesStorage.save([...current, id]);
    }
  },
  async remove(id: string): Promise<void> {
    const current = await favoritesStorage.getAll();
    await favoritesStorage.save(current.filter(i => i !== id));
  },
};
