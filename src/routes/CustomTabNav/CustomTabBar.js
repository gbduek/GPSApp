import { View, TouchableWithoutFeedback, StyleSheet, Text } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { navigate } from "../NavReferencer/navigationRef";

const CustomTabBar = ({ state }) => {
	const dummyRoutes = [
		{ name: "Home", key: "home" },
		{ name: "Permissões", key: "permissions" },
		{ name: "Perfil", key: "profile" },
	];

	const routes = state?.routes || dummyRoutes;
	const index = state?.index || 0;

	return (
		<View style={styles.tabBar}>
			{routes.map((route, i) => {
				const focused = i === index;
				const iconName = {
					Home: "home",
					Permissões: "check-circle",
					Perfil: "person",
				}[route.name];

				const IconComponent =
					route.name === "Permissões" ? MaterialIcons : Ionicons;

				return (
					<TouchableWithoutFeedback
						key={route.key}
						onPress={() => {
							// For nested screens:
							// If the screen is in a Tab Navigator
							if (route.name === "Permissões") {
								navigate("Home", { screen: "Permissões" });
							} else if (route.name === "Perfil") {
								navigate("Home", { screen: "Perfil" });
							} else if (route.name === "Home") {
								navigate("Home", { screen: "Feed" });
							}
						}}
					>
						<View style={styles.tabItem}>
							<IconComponent
								name={iconName}
								size={25}
								color={focused ? "orange" : "gray"}
							/>
							<Text
								style={[
									styles.label,
									focused && styles.activeLabel,
								]}
							>
								{route.name}
							</Text>
						</View>
					</TouchableWithoutFeedback>
				);
			})}
		</View>
	);
};

const styles = StyleSheet.create({
	tabBar: {
		flexDirection: "row",
		height: 75,
		backgroundColor: "#fff",
		borderTopWidth: 1,
		borderTopColor: "#e0e0e0",
	},
	tabItem: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 18,
	},
	label: {
		fontSize: 10,
		color: "gray",
		marginTop: 4,
		fontWeight: "500",
	},
	activeLabel: {
		color: "orange",
	},
});

export default CustomTabBar;
