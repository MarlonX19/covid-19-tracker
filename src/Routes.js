import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import CountryInfo from './screens/CountryInfo';
import Main from './screens/Main';

import HeaderButton from './components/HeaderButton';


const Stack = createStackNavigator();


export default function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Covid-19"
                    component={Main} options={{
                        headerRight: () => (
                            <HeaderButton />
                        ),
                    }} />
                <Stack.Screen
                    name="CountryInfo"
                    component={CountryInfo} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
