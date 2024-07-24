import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/HomeScreen";
import Profile from "../screens/Profile";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const TabRoutes = () => {
    return (
        <Tab.Navigator screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: 'orange'}}>
            <Tab.Screen name="Feed" component={HomeScreen}
             options={{
                tabBarIcon: ({size, color}) => <Ionicons name={'home'} color={color} size={size}/>,
                tabBarShowLabel: false
             }}/>

            <Tab.Screen name="Perfil" component={Profile}
              options={{
                tabBarIcon: ({size, color}) => <Ionicons name={'person'} color={color} size={size}/>,
                tabBarShowLabel: false
             }}/>
          </Tab.Navigator>
    )
}

export default TabRoutes;