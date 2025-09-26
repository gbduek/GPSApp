import React, { useState } from "react";
import { View, Text, Linking } from "react-native";
import { DrawerItem } from "@react-navigation/drawer";
import {
	Ionicons,
	MaterialCommunityIcons,
	FontAwesome5,
} from "@expo/vector-icons";
import styles from "./styles";
import InitEvalIcon from "../../../assets/Icons/InitEvalIcon";

const DimensionDropdown = ({ menuData, props }) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const toggle = () => setIsExpanded((prev) => !prev);

	const getIconForDimension = (sigla, color) => {
		// Define icon for each dimension based on the sigla or other identifiers
		switch (sigla) {
			case "Mente":
				return (
					<MaterialCommunityIcons
						name="head-lightbulb-outline"
						size={24}
						color={color}
					/>
				);
			case "Estilo de vida":
				return <Ionicons name="fitness" size={24} color={color} />;
			case "Corpo":
				return <Ionicons name="body" size={24} color={color} />;
			case "Avaliação inicial":
				return <InitEvalIcon width={24} height={24} color={color} />;
			default:
				return (
					<FontAwesome5
						name="question-circle"
						size={24}
						color={color}
					/>
				);
		}
	};

	return (
		<>
			<DrawerItem
				label={() => (
					<View style={{ flexDirection: "row" }}>
						<Text
							style={[
								styles.drawerLabel,
								{ color: "rgba(5, 5, 5, 0.6)" },
							]}
						>
							Avaliações
						</Text>
						<Ionicons
							name={isExpanded ? "chevron-down" : "chevron-up"}
							size={22}
							color="rgba(5, 5, 5, 0.6)"
						/>
					</View>
				)}
				labelStyle={styles.drawerLabel}
				icon={({ color, size }) => (
					<Ionicons name="medkit" size={size} color={color} />
				)}
				onPress={toggle}
				style={styles.drawerItem}
			/>
			{isExpanded && (
				<View style={styles.subMenu}>
					{menuData.map((item) => (
						<DrawerItem
							key={item.id}
							label={item.sigla}
							labelStyle={styles.subMenuLabel}
							icon={({ color, size }) =>
								getIconForDimension(item.sigla, color)
							}
							onPress={() =>
								props.navigation.navigate(item.sigla)
							}
							style={styles.drawerItem}
						/>
					))}
				</View>
			)}
		</>
	);
};

const EducationDropdown = ({ navigation }) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const toggle = () => setIsExpanded((prev) => !prev);

	return (
		<>
			<DrawerItem
				label={() => (
					<View style={{ flexDirection: "row" }}>
						<Text
							style={[
								styles.drawerLabel,
								{
									color: "rgba(5, 5, 5, 0.6)",
									marginLeft: -5,
								},
							]}
						>
							Educação
						</Text>
						{isExpanded ? (
							<Ionicons
								name="chevron-down"
								size={22}
								color="rgba(5, 5, 5, 0.6)"
							/>
						) : (
							<Ionicons
								name="chevron-up"
								size={22}
								color="rgba(5, 5, 5, 0.6)"
							/>
						)}
					</View>
				)}
				labelStyle={styles.drawerLabel}
				icon={({ color, size }) => (
					<FontAwesome5
						name="graduation-cap"
						size={size}
						color={color}
					/>
				)}
				onPress={toggle}
				style={styles.drawerItem}
			/>
			{isExpanded && (
				<View style={styles.subMenu}>
					<DrawerItem
						label="Blog"
						labelStyle={styles.subMenuLabel}
						icon={({ color, size }) => (
							<FontAwesome5
								name="blog"
								size={size}
								color={color}
							/>
						)}
						onPress={() =>
							Linking.openURL("https://gps.med.br/blog/")
						}
						style={styles.drawerItem}
					/>
					<DrawerItem
						label="Meus Cursos"
						labelStyle={styles.subMenuLabel}
						icon={({ color, size }) => (
							<FontAwesome5
								name="pencil-alt"
								size={size}
								color={color}
							/>
						)}
						onPress={() =>
							Linking.openURL(
								"https://portal.gps.med.br/login/index.php"
							)
						}
						style={styles.drawerItem}
					/>
				</View>
			)}
		</>
	);
};

export const Dropdowns = {
	dimension: DimensionDropdown,
	education: EducationDropdown,
};
