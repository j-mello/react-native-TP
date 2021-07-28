import React, {useContext} from 'react';
import {ActivityIndicator, DefaultTheme, Provider} from 'react-native-paper';
import {View, Text} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Credentials from './../screens/Credentials';
import {CredentialsContext} from '../contexts/CredentialsContext';
import Weather from '../screens/Weather';

const Tab = createMaterialBottomTabNavigator();

const theme = {
  ...DefaultTheme,
  dark: false,
};

export default function ReadyComponent() {
  const {token} = useContext(CredentialsContext);

  return (
    <Provider theme={theme}>
      {token === undefined && (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>native4IW1</Text>
          <ActivityIndicator />
        </View>
      )}
      {token !== undefined && (
        <Tab.Navigator>
          <Tab.Screen name="Credentials" component={Credentials} />
          <Tab.Screen name="Weather" component={Weather} />
        </Tab.Navigator>
      )}
    </Provider>
  );
}
