import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/Home/HomeScreen";
import Profile from "../screens/Profile";
import { PermissionStack } from "./stack.routes";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const TabRoutes = () => {
	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
				tabBarActiveTintColor: "orange",
			}}
		>
			<Tab.Screen
				name="Home"
				options={{
					tabBarIcon: ({ size, color }) => (
						<Ionicons name="home" color={color} size={size} />
					),
					tabBarShowLabel: true,
				}}
			>
				{(props) => (
					<HomeScreen {...props} tabNavigation={props.navigation} />
				)}
			</Tab.Screen>

			<Tab.Screen
				name="Permissões"
				options={{
					tabBarIcon: ({ size, color }) => (
						<MaterialIcons
							name="check-circle"
							color={color}
							size={size}
						/>
					),
					tabBarShowLabel: true,
				}}
			>
				{(props) => (
					<PermissionStack
						{...props}
						tabNavigation={props.navigation}
					/>
				)}
			</Tab.Screen>

			<Tab.Screen
				name="Perfil"
				options={{
					tabBarIcon: ({ size, color }) => (
						<Ionicons name="person" color={color} size={size} />
					),
					tabBarShowLabel: true,
				}}
			>
				{(props) => (
					<Profile {...props} tabNavigation={props.navigation} />
				)}
			</Tab.Screen>
		</Tab.Navigator>
	);
};

export default TabRoutes;
