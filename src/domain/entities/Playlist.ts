import { Station } from './Station';

export interface Playlist {
  id: string;
  name: string;
  description: string;
  stationIds: string[];
  createdAt: number;
  updatedAt: number;
}

export interface PlaylistWithStations extends Playlist {
  stations: Station[];
}
