import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Mente from "../screens/Mente";
import Corpo from "../screens/Corpo";
import LifeStyle from "../screens/LifeStyle";
import Registry from "../../Registries/Registry";
import Questionary from "../../Components/Questionary";
import PermissionProfile from '../screens/Permissions/PermissionProfile';
import PermissionScreen from '../screens/Permissions/PermissionScreen';

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
                    headerTitle: 'Mente',
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

// Stack navigator for Corpo screens
export const CorpoStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Corpo"
                component={Corpo}
                options={{
                    headerShown: false,
                    headerTitle: 'Corpo',
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

// Stack navigator for LifeStyle screens
export const LifeStyleStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="LifeStyle"
                component={LifeStyle}
                options={{
                    headerShown: false,
                    headerTitle: 'Estilo de Vida',
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


// Stack navigator for Permissão screens
export const PermissionStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="PermissionScreen"
                component={PermissionScreen}
                options={{
                    headerShown: false,
                    headerTitle: 'Permissões',
                }}
            />
            <Stack.Screen
                name="PermissionProfile"
                component={PermissionProfile}
                options={{
                    headerShown: true,
                    headerTintColor: 'orange',
                    headerTitle: '',
                }}
            />
        </Stack.Navigator>
    );
};
