import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import TabNavigator       from './TabNavigator';
import LoginScreen        from '../../features/auth/screens/LoginScreen';
import RadioDetailScreen  from '../../features/radio-detail/screens/RadioDetailScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  // Simulated auth — swap this for real auth in Phase 2
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isLoggedIn ? (
        <Stack.Screen name="Login">
          {props => <LoginScreen {...props} onLogin={() => setIsLoggedIn(true)} />}
        </Stack.Screen>
      ) : (
        <>
          <Stack.Screen name="MainApp"     component={TabNavigator} />
          <Stack.Screen name="RadioDetail" component={RadioDetailScreen}
            options={{ headerShown: true, title: 'Station Details', presentation: 'card' }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
