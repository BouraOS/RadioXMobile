export interface Station {
  id: string;
  name: string;
  streamUrl: string;
  logoUrl: string | null;
  country: string;
  countryCode: string;
  genres: string[];
  language: string;
  bitrate: number;
  codec: string;
  listenerCount: number;
  rating: number;
  isOnline: boolean;
  homepage: string | null;
}

export interface StationDTO {
  stationuuid: string;
  name: string;
  url_resolved: string;
  favicon: string;
  country: string;
  countrycode: string;
  tags: string;
  language: string;
  bitrate: number;
  codec: string;
  clickcount: number;
  votes: number;
  lastcheckok: number;
  homepage: string;
}
