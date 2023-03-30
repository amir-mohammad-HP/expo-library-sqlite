import 'react-native-gesture-handler';

import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { DatabaseProvider } from './context/contextDb';

// https://reactnavigation.org/docs/7.x/drawer-based-navigation

import {
  SearchScreen,
  CreateScreen
} from './screens';


const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <DatabaseProvider>
      <NavigationContainer>
        <Drawer.Navigator 
          initialRouteName="Home"
          screenOptions={{ 
            headerStyle: { 
              backgroundColor: 'papayawhip',
            },
          }}
          >
          <Drawer.Screen 
            name="Search" 
            component={SearchScreen} 
            options={{
              title: 'کتاب ها',
              
            }}
            />
          <Drawer.Screen  
            name="Create"  
            component={CreateScreen}  
            options={{
              title: 'کتاب جدید',
            }} 
            />
        </Drawer.Navigator>
      </NavigationContainer>
    </DatabaseProvider>
  );
}
