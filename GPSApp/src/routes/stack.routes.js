import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Mente from "../screens/Mente";
import Corpo from "../screens/Corpo";
import LifeStyle from "../screens/LifeStyle";
import Registry from "../../Registries/Registry";
import Questionary from "../../Components/Questionary";

const Stack = createStackNavigator();

// Stack navigator for Mente screens
export const MenteStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Mente"
                component={Mente}
                options={{
                    headerShown: false,
                    headerTitle: '',
                }}
            />
            <Stack.Screen
                name="Registry"
                component={Registry}
                options={{
                    headerShown: true,
                    headerTintColor: 'orange',
                    headerTitle: '',
                }}
            />
            <Stack.Screen
                name="Questionary"
                component={Questionary}
                options={{
                    headerShown: true,
                    headerTintColor: 'orange',
                }}
            />
        </Stack.Navigator>
    );
};

// Stack navigator for Corpo screens
export const CorpoStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Corpo"
                component={Corpo}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Registry"
                component={Registry}
                options={{
                    headerShown: true,
                    headerTintColor: 'orange',
                    headerTitle: '',
                }}
            />
            <Stack.Screen
                name="Questionary"
                component={Questionary}
                options={{
                    headerShown: true,
                    headerTintColor: 'orange',
                }}
            />
        </Stack.Navigator>
    );
};

// Stack navigator for LifeStyle screens
export const LifeStyleStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="LifeStyle"
                component={LifeStyle}
                options={{
                    headerShown: false,
                    headerTitle: '',
                }}
            />
            <Stack.Screen
                name="Registry"
                component={Registry}
                options={{
                    headerShown: true,
                    headerTintColor: 'orange',
                    headerTitle: '',
                }}
            />
            <Stack.Screen
                name="Questionary"
                component={Questionary}
                options={{
                    headerShown: true,
                    headerTintColor: 'orange',
                    headerTitle: '',
                }}
            />
        </Stack.Navigator>
    );
};
