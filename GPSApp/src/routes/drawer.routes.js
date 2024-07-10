import React from 'react';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import TabRoutes from "./tab.routes";
import { MenteStack, CorpoStack, LifeStyleStack } from './stack.routes';
import PdS from "../screens/PdS";
import Recom from "../screens/Recom";
import Diary from "../screens/Diary";

const Drawer = createDrawerNavigator();

const DrawerRoutes = () => {
    return (
        <Drawer.Navigator screenOptions={{
             headerShown: false,
             drawerStyle: {backgroundColor: 'orange'},
             drawerActiveBackgroundColor: 'rgba(255, 255, 255, 0.3)',
             drawerActiveTintColor: 'white',
             drawerLabelStyle: {fontSize: 20, fontWeight: 'bold'},
              }}>
            <Drawer.Screen
                name="Home"
                component={TabRoutes}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="home-outline" size={size} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Mente"
                component={MenteStack} // Use MenteStack navigator
                options={{
                    drawerIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="head-lightbulb-outline" size={size} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Estilo de Vida"
                component={LifeStyleStack} // Use LifeStyleStack navigator
                options={{
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="fitness-outline" size={size} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Corpo"
                component={CorpoStack} // Use CorpoStack navigator
                options={{
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="body-outline" size={size} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Perfil de Saúde"
                component={PdS}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="analytics-outline" size={size} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Recomendações"
                component={Recom}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="bulb-outline" size={size} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Diário"
                component={Diary}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="journal-outline" size={size} color={color} />
                    ),
                }}
            />
        </Drawer.Navigator>
    );
};

export default DrawerRoutes;
