import { NavigatorScreenParams } from '@react-navigation/native';

export type TabParamList = {
  Home:      undefined;
  Explore:   undefined;
  Favorites: undefined;
  Playlist:  undefined;
};

export type RootStackParamList = {
  Login:       undefined;
  MainApp:     NavigatorScreenParams<TabParamList>;
  RadioDetail: { stationId: string };
};
