import React, { useContext, useState } from "react";
import {
	View,
	Image,
	Linking,
	Alert,
	ScrollView,
	Platform,
} from "react-native";
import { DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import DataContext from "../../../Context/DataContext";

import styles from "./styles";
import { Dropdowns } from "./Dropdowns";

const CustomDrawerContent = (props) => {
	const { state } = props;
	const { userLogged, menuData } = useContext(DataContext);
	const isActive = (routeName) => {
		return state.routes[state.index].name === routeName;
	};
	const drawerItems = [
		{
			key: "home",
			label: "Home",
			icon: "home",
			onPress: () => props.navigation.navigate("Home"),
			isActive: isActive("Home"),
		},
		{
			key: "ajuda",
			label: "Ajuda",
			icon: "alert-circle",
			onPress: handleAjudaPress,
		},
		{
			key: "sair",
			label: "Sair",
			icon: "exit-outline",
			onPress: handleLogout,
		},
	];

	const handleAjudaPress = () => {
		Linking.openURL("https://gps.med.br/biblioteca-de-tutoriais/");
	};

	const handleLogout = async () => {
		try {
			await axios.get(
				`https://api3.gps.med.br/API/Acesso/Logout/${userLogged}`
			);
			props.setIsAuthenticated(false);
		} catch (error) {
			Alert.alert("Error", "Failed to log out. Please try again.");
		}
	};

	return (
		<View style={{ flex: 1 }}>
			<View style={styles.header}>
				<Image
					source={require("../../../assets/gps_logo.png")}
					style={styles.headerImage}
				/>
			</View>
			<ScrollView
				style={styles.drawerItems}
				showsVerticalScrollIndicator={false}
			>
				<DrawerItem
					label="Home"
					labelStyle={{
						color: isActive("Home")
							? "white"
							: "rgba(5, 5, 5, 0.6)", // Apply conditionally
						fontWeight: "bold",
						fontSize: 20,
					}}
					icon={({ color, size }) => (
						<Ionicons
							name="home"
							size={size}
							color={isActive("Home") ? "white" : color}
						/>
					)}
					onPress={() => props.navigation.navigate("Home")}
					style={[
						styles.drawerItem,
						{
							backgroundColor: isActive("Home")
								? "rgba(255, 255, 255, 0.3)"
								: "orange",
						},
						{ marginBottom: -8 },
					]}
				/>

				{/* Dropdown for Dimensões */}
				<Dropdowns.dimension menuData={menuData} props={props} />
				{/* Dropdown for Dimensões */}

				<DrawerItemList {...props} />

				{/* Dropdown for Educação */}
				<Dropdowns.education navigation={props.navigation} />
				{/* Dropdown for Educação */}

				<DrawerItem
					label="Ajuda"
					labelStyle={styles.drawerLabel}
					icon={({ color, size }) => (
						<Ionicons
							name="alert-circle"
							size={size}
							color={color}
						/>
					)}
					onPress={handleAjudaPress}
					style={styles.drawerItem}
				/>
				<DrawerItem
					label="Sair"
					labelStyle={styles.drawerLabel}
					icon={({ color, size }) => (
						<Ionicons
							name="exit-outline"
							size={size}
							color={color}
						/>
					)}
					onPress={handleLogout}
					style={styles.drawerItem}
				/>
				{Platform.OS === "android" && <View style={{ height: 200 }} />}
			</ScrollView>
		</View>
	);
};

export default CustomDrawerContent;
