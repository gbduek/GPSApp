import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/Home/HomeScreen";
import Profile from "../screens/Profile";
import { PermissionStack } from "./stack.routes";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

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

            {/* <Tab.Screen 
                name="Permissões" component={PermissionStack} 
                options={{
                    tabBarIcon: ({size, color}) => <MaterialIcons name={'check-circle'} color={color} size={size}/>,
                    tabBarShowLabel: false
             }}/>  */}

            <Tab.Screen name="Perfil" component={Profile}
              options={{
                tabBarIcon: ({size, color}) => <Ionicons name={'person'} color={color} size={size}/>,
                tabBarShowLabel: false
             }}/>
          </Tab.Navigator>
    )
}

export default TabRoutes;