import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text} from 'react-native';
import {TabParamList} from './types';
import {useTheme} from '../../shared/hooks/useTheme';
import HomeScreen from '../../features/home/screens/HomeScreen';
import ExploreScreen from '../../features/explore/screens/ExploreScreen';
import FavoritesScreen from '../../features/favorites/screens/FavoritesScreen';
import PlaylistScreen from '../../features/playlist/screens/PlaylistScreen';

const Tab = createBottomTabNavigator<TabParamList>();

const icons: Record<string, string> = {
  Home: '🏠',
  Explore: '🔍',
  Favorites: '❤️',
  Playlist: '📋',
};

// Define TabIcon outside
const TabIcon = ({name, focused}: {name: string; focused: boolean}) => {
  return (
    <Text style={{fontSize: 20, opacity: focused ? 1 : 0.5}}>
      {icons[name]}
    </Text>
  );
};

export default function TabNavigator() {
  const {colors} = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.tabBar.background,
          borderTopColor: colors.tabBar.border,
        },
        tabBarActiveTintColor: colors.tabBar.active,
        tabBarInactiveTintColor: colors.tabBar.inactive,
        tabBarIcon: ({focused}) => (
          <TabIcon name={route.name} focused={focused} />
        ),
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Playlist" component={PlaylistScreen} />
    </Tab.Navigator>
  );
}
