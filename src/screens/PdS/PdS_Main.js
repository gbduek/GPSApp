import React, { useState, useRef } from "react";
import {
	View,
	Text,
	ScrollView,
	TouchableOpacity,
	StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Header from "../../../Components/Header";
import PdSDiary from "./PdSDiary"; // Import the new screen
import PdS from "./PdS";
import CustomTabBar from "../../routes/CustomTabNav/CustomTabBar";

const PdS_Main = () => {
	const [selectedPage, setSelectedPage] = useState("Perfil de Saúde");
	const scrollRef = useRef(null);

	// Define the menu items
	const menuItems = ["Perfil de Saúde", "Diários"];

	return (
		<SafeAreaView edges={[]} style={{ flex: 1, backgroundColor: "white" }}>
			<Header />
			<ScrollView
				ref={scrollRef}
				contentContainerStyle={{
					backgroundColor: "white",
					paddingBottom: 70,
					flexGrow: 1,
				}}
			>
				<View style={{ height: 25 }} />
				{/* Title Section */}
				<View
					style={{
						flexDirection: "row",
						marginBottom: 30,
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<Ionicons
						name="bar-chart"
						size={35}
						color={"orange"}
						style={{ marginRight: 5 }}
					/>
					<Text style={styles.title}>Perfil de Saúde</Text>
				</View>

				{/* Slidable Menu */}
				<View style={{ alignItems: "center" }}>
					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
					>
						<View style={styles.menuContainer}>
							{menuItems.map((item) => (
								<TouchableOpacity
									key={item}
									style={styles.menuItem}
									onPress={() => setSelectedPage(item)}
								>
									<Text
										style={[
											styles.menuText,
											selectedPage === item &&
												styles.activeMenuText,
										]}
									>
										{item}
									</Text>
									{selectedPage === item && (
										<View style={styles.activeUnderline} />
									)}
								</TouchableOpacity>
							))}
						</View>
					</ScrollView>
				</View>

				{/* Render the selected page */}
				{selectedPage === "Perfil de Saúde" ? <PdS /> : <PdSDiary />}
			</ScrollView>

			{/* Button to go all the way up on the scrollpage */}
			{selectedPage === "Perfil de Saúde" && (
				<TouchableOpacity
					onPress={() =>
						scrollRef.current?.scrollTo({ y: 0, animated: true })
					}
					style={styles.upScrollButton}
				>
					<Ionicons name="arrow-up" size={24} color={"white"} />
				</TouchableOpacity>
			)}
			<CustomTabBar />
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	menuContainer: {
		flexDirection: "row",
		justifyContent: "center",
		maxWidth: "100%",
		marginBottom: 10,
	},

	menuItem: {
		paddingHorizontal: 15,
		paddingVertical: 10,
		alignItems: "center",
	},

	menuText: {
		fontSize: 16,
		color: "gray",
		fontWeight: "bold",
	},

	activeMenuText: {
		color: "orange",
	},

	activeUnderline: {
		width: "100%",
		height: 3,
		backgroundColor: "orange",
		marginTop: 2,
		borderRadius: 2,
	},
	title: {
		fontSize: 26,
		fontWeight: "bold",
		color: "orange",
	},
	upScrollButton: {
		position: "absolute",
		top: "81%",
		right: "5.5%",
		backgroundColor: "orange",
		borderRadius: 25,
		width: 60,
		height: 60,
		alignItems: "center",
		justifyContent: "center",
		elevation: 5,
		borderRadius: 30,
		elevation: 6,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 3,
		zIndex: 999,
		opacity: 0.8,
	},
});

export default PdS_Main;
