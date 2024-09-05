import React from 'react';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import TabRoutes from "./tab.routes";
import { MenteStack, CorpoStack, LifeStyleStack } from './stack.routes';
import PdS from "../screens/PdS";
import Recom from "../screens/Recom";
import Diary from "../screens/Diary";
import CustomDrawerContent from './CustomDrawerContent';

const Drawer = createDrawerNavigator();

const DrawerRoutes = ({ setIsAuthenticated }) => {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false,
                drawerStyle: { backgroundColor: 'orange' },
                drawerActiveBackgroundColor: 'rgba(255, 255, 255, 0.3)',
                drawerActiveTintColor: 'white',
                drawerLabelStyle: { fontSize: 20, fontWeight: 'bold', marginLeft: -15 },
            }}
            drawerContent={(props) => <CustomDrawerContent {...props} setIsAuthenticated={setIsAuthenticated}/>}
        >
            <Drawer.Screen
                name="Home"
                component={TabRoutes}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="home" size={size} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Mente"
                component={MenteStack}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="head-lightbulb-outline" size={size} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Estilo de Vida"
                component={LifeStyleStack}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="fitness" size={size} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Corpo"
                component={CorpoStack}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="body" size={size} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Diários"
                component={Diary}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="book" size={size} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Perfil de Saúde"
                component={PdS}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="bar-chart" size={size} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Recomendações"
                component={Recom}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="bulb" size={size} color={color} />
                    ),
                }}
            />
        </Drawer.Navigator>
    );
};

export default DrawerRoutes;
