import { apiClient } from './apiClient';
import { StationDTO } from '../../domain/entities/Station';

export const radioBrowserApi = {
  async getTopStations(limit = 20): Promise<StationDTO[]> {
    const { data } = await apiClient.get<StationDTO[]>('/stations/topclick', {
      params: { limit, hidebroken: true, has_geo_info: false },
    });
    return data;
  },

  async searchStations(params: {
    name?: string;
    tag?: string;
    country?: string;
    language?: string;
    limit?: number;
    offset?: number;
  }): Promise<StationDTO[]> {
    const { data } = await apiClient.get<StationDTO[]>('/stations/search', {
      params: {
        ...params,
        limit: params.limit ?? 30,
        offset: params.offset ?? 0,
        hidebroken: true,
        order: 'clickcount',
        reverse: true,
      },
    });
    return data;
  },

  async getStationById(id: string): Promise<StationDTO | null> {
    const { data } = await apiClient.get<StationDTO[]>(`/stations/byuuid/${id}`);
    return data?.[0] ?? null;
  },

  async getTags(limit = 50): Promise<{ name: string; stationcount: number }[]> {
    const { data } = await apiClient.get('/tags', {
      params: { order: 'stationcount', reverse: true, limit },
    });
    return data;
  },

  async recordClick(stationId: string): Promise<void> {
    await apiClient.get(`/url/${stationId}`).catch(() => {});
  },
};
