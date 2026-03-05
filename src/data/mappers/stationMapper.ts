import { Station, StationDTO } from '../../domain/entities/Station';

export const stationMapper = {
  fromDTO(dto: StationDTO): Station {
    return {
      id:            dto.stationuuid,
      name:          dto.name?.trim() || 'Unknown Station',
      streamUrl:     dto.url_resolved,
      logoUrl:       dto.favicon || null,
      country:       dto.country || '',
      countryCode:   dto.countrycode || '',
      genres:        dto.tags
                       ? dto.tags.split(',').map(t => t.trim()).filter(Boolean)
                       : [],
      language:      dto.language || '',
      bitrate:       dto.bitrate || 0,
      codec:         dto.codec || '',
      listenerCount: dto.clickcount || 0,
      rating:        dto.votes || 0,
      isOnline:      dto.lastcheckok === 1,
      homepage:      dto.homepage || null,
    };
  },

  fromDTOList(dtos: StationDTO[]): Station[] {
    return dtos
      .filter(dto => dto.url_resolved)
      .map(dto => stationMapper.fromDTO(dto));
  },
};
