import React, {useContext} from 'react';
import {ActivityIndicator, DefaultTheme, Provider} from 'react-native-paper';
import {View, Text} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Cruds from '../screens/Cruds';
import Sublist from "../screens/subList";
import CrudProvider, {CrudContext} from "../contexts/CrudContext";

const Tab = createMaterialBottomTabNavigator();

const theme = {
    ...DefaultTheme,
    dark: false,
};

export default function ReadyComponent() {

    return (
        <Provider theme={theme}>
            <CrudProvider>
                <CrudContext.Consumer>
                    {
                        ({selectedCrud}) =>
                            <Tab.Navigator>
                                {
                                    selectedCrud == null &&
                                        <Tab.Screen name="Crud" component={Cruds}/>
                                }
                                {
                                    selectedCrud != null &&
                                        <Tab.Screen name="Sublists" component={Sublist}/>
                                }
                            </Tab.Navigator>
                    }
                </CrudContext.Consumer>
            </CrudProvider>
        </Provider>
    );
}
