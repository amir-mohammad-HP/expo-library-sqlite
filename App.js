import 'react-native-gesture-handler';

import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

// https://reactnavigation.org/docs/7.x/drawer-based-navigation

import {
  SearchScreen,
  CreateScreen
} from './screens';


const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="search" component={SearchScreen} />
        <Drawer.Screen name="create" component={CreateScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
