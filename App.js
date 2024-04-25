import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { ConneXion, DashBoard, Profile, ServiceAdd, ServiceDetail, Services, ViewOrder } from './home';
import { useFonts } from 'expo-font';


const Page = createStackNavigator();
//npx expo install @react-navigation/native @react-navigation/stack axios eas-cli expo-camera expo-image-picker expo-linear-gradient expo-secure-store expo-splash-screen expo-sqlite expo-status-bar expo-system-ui react-native-gesture-handler react-native-iphone-x-helper react-native-reanimated react-native-safe-area-context react-native-screens react-native-svg react-native-swipe-modal-up-down
export default function App() {
  const [fontsLoaded] = useFonts({
    'Great_Vibes': require('./assets/Great_Vibes/GreatVibes-Regular.ttf'),
  });

  return (
    <NavigationContainer>
      <Page.Navigator initialRouteName='Home'>
        <Page.Screen
          name="Home"
          component={DashBoard}
          options={{
            headerShown: false
          }}
        />

        <Page.Screen
          name="Servcies"
          component={Services}
          options={{
            headerShown: false
          }}
        />
        <Page.Screen
          name="Connexion"
          component={ConneXion}
          options={{
            headerShown: false
          }}
        />


        <Page.Screen
          name="Profile"
          component={Profile}
          options={{
            headerShown: false
          }}
        />

        <Page.Screen
          name="ViewOrder"
          component={ViewOrder}
          options={{
            headerShown: false
          }}
        />

        <Page.Screen
          name="ServiceDetail"
          component={ServiceDetail}
          options={{
            headerShown: false
          }}
        />

        <Page.Screen
          name="ServiceAdd"
          component={ServiceAdd}
          options={{
            headerShown: false
          }}
        />
      </Page.Navigator>
    </NavigationContainer>
  );
}