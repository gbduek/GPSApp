import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Dimension from '../screens/Dimension/Dimension';
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
                options={{
                    headerShown: false,
                    headerTitle: 'Mente',
                }}
            >
                {props => <Dimension {...props} id="40c6eaad-8815-4cbc-9caf-78f081f03674" />}
            </Stack.Screen>
            <Stack.Screen
                name="Registry"
                options={{
                    headerShown: true,
                    headerTintColor: 'orange',
                    headerTitle: '',
                }}
            >
                {props => <Registry {...props} />}
            </Stack.Screen>

            <Stack.Screen
                name="Questionary"
                options={{
                    headerShown: true,
                    headerTintColor: 'orange',
                    headerTitle: '',
                }}
            >
                {props => <Questionary {...props} />}
            </Stack.Screen>
        </Stack.Navigator>
    );
};

// Stack navigator for Corpo screens
export const CorpoStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Corpo"
                options={{
                    headerShown: false,
                    headerTitle: 'Corpo',
                }}
            >
                {props => <Dimension {...props} id="20118275-8791-469e-b9f5-3210f990dd01" />}
            </Stack.Screen>
            <Stack.Screen
                name="Registry"
                options={{
                    headerShown: true,
                    headerTintColor: 'orange',
                    headerTitle: '',
                }}
            >
                {props => <Registry {...props} />}
            </Stack.Screen>

            <Stack.Screen
                name="Questionary"
                options={{
                    headerShown: true,
                    headerTintColor: 'orange',
                    headerTitle: '',
                }}
            >
                {props => <Questionary {...props} />}
            </Stack.Screen>
        </Stack.Navigator>
    );
};

// Stack navigator for LifeStyle screens
export const LifeStyleStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="LifeStyle"
                options={{
                    headerShown: false,
                    headerTitle: 'Estilo de Vida',
                }}
            >
                {props => <Dimension {...props} id="7ed63315-ff7b-4658-b488-7655487e2845" />}
            </Stack.Screen>

            <Stack.Screen
                name="Registry"
                options={{
                    headerShown: true,
                    headerTintColor: 'orange',
                    headerTitle: '',
                }}
            >
                {props => <Registry {...props} />}
            </Stack.Screen>

            <Stack.Screen
                name="Questionary"
                options={{
                    headerShown: true,
                    headerTintColor: 'orange',
                    headerTitle: '',
                }}
            >
                {props => <Questionary {...props} />}
            </Stack.Screen>
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
