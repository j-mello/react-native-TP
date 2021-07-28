import React, {useContext} from 'react';
import {ActivityIndicator, DefaultTheme, Provider} from 'react-native-paper';
import {View, Text} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Weather from '../screens/Weather';

const Tab = createMaterialBottomTabNavigator();

const theme = {
  ...DefaultTheme,
  dark: false,
};

export default function ReadyComponent() {

  return (
    <Provider theme={theme}>
        <Tab.Navigator>
          <Tab.Screen name="Weather" component={Weather} />
        </Tab.Navigator>
    </Provider>
  );
}