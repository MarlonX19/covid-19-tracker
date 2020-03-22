import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import CountryInfo from './screens/CountryInfo';
import Main from './screens/Main';


const Stack = createStackNavigator();


export default function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Main" component={Main} />
                <Stack.Screen name="CountryInfo" component={CountryInfo} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
