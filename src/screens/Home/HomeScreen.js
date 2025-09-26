import React, { useEffect, useContext } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
	MaterialCommunityIcons,
	Ionicons,
	FontAwesome5,
} from "@expo/vector-icons";
import Rings from "../../../Components/Rings";
import Header from "../../../Components/Header";
import DataContext from "../../../Context/DataContext";
import NotebookIcon from "../../../assets/Icons/NotebookIcon";
import styles from "./styles";
import GreetingSection from "./GreetingSection";
import BannerSection from "./BannerSection";
import SliderSection from "./SliderSection";
import FeedbackPage from "../Feedback/Feedback";

const HomeScreen = () => {
	const {
		firstName,
		percentages,
		fetchPercentages,
		temDiario,
		menuData,
		userCompany,
	} = useContext(DataContext);

	useEffect(() => {
		fetchPercentages();
	}, []);

	const renderLogo = (logoUrl) => {
		let additionalStyle = {};
		if (logoUrl.includes("Mente")) {
			return (
				<MaterialCommunityIcons
					style={styles.iconContainer}
					name="head-lightbulb-outline"
					size={45}
					color="orange"
				/>
			);
		} else if (logoUrl.includes("Estilo de Vida")) {
			additionalStyle = { left: 41, top: 177 };
			return (
				<FontAwesome5
					style={[styles.iconContainer, additionalStyle]}
					name="running"
					size={45}
					color="orange"
				/>
			);
		} else if (logoUrl.includes("Corpo")) {
			additionalStyle = { left: 37.5, top: 320 };
			return (
				<Ionicons
					style={[styles.iconContainer, additionalStyle]}
					name="body"
					size={45}
					color="orange"
				/>
			);
		} else {
			return null;
		}
	};

	const navigation = useNavigation();

	const handleNavigation = (screen, data) => () => {
		navigation.navigate(screen, data);
	};

	return (
		<View style={styles.container}>
			<Header />
			<View style={styles.content}>
				<ScrollView
					contentContainerStyle={styles.scrollViewContent}
					horizontal={false}
				>
					<GreetingSection firstName={firstName} />

					<BannerSection userCompany={userCompany} />

					<SliderSection
						percentages={percentages}
						navigation={navigation}
						menuData={menuData}
					/>

					<View style={styles.paragraphContainer}>
						<View style={styles.iconBackground}>
							<TouchableOpacity
								onPress={handleNavigation("Diários")}
							>
								<Ionicons
									name="book-outline"
									size={24}
									color="white"
								/>
							</TouchableOpacity>
						</View>
						<View style={styles.paragraphTextContainer}>
							<Text style={styles.paragraphTitle}>
								Como você está hoje?
							</Text>
							<Text style={styles.paragraphDescription}>
								Registrando no diário, você poderá aumentar seu
								autoconhecimento e ter acesso ao seu histórico
								ao longo do tempo.
							</Text>
						</View>
					</View>

					{temDiario ? (
						<View>
							<NotebookIcon />
						</View>
					) : (
						<View style={styles.ribbonContainer}>
							<Text style={styles.ribbonText}>
								Você ainda não registrou nenhum diário
							</Text>
						</View>
					)}

					<View style={styles.paragraphContainer}>
						<View style={styles.iconBackground}>
							<TouchableOpacity
								onPress={handleNavigation("Perfil de Saúde")}
							>
								<Ionicons
									name="bar-chart-outline"
									size={24}
									color="white"
								/>
							</TouchableOpacity>
						</View>
						<View style={styles.paragraphTextContainer}>
							<Text style={styles.paragraphTitle}>
								Quer saber o que pode melhorar em sua saúde?
							</Text>
							<Text style={styles.paragraphDescription}>
								Acompanhe seu perfil de saúde e veja o que deve
								priorizar!
							</Text>
						</View>
					</View>

					<View style={styles.ringsContainer}>
						<Rings dimen={"Mente"} />
						{renderLogo("Mente")}
						<Rings dimen={"Estilo de Vida"} />
						{renderLogo("Estilo de Vida")}
						<Rings dimen={"Corpo"} />
						{renderLogo("Corpo")}
					</View>

					<View
						style={[
							styles.paragraphContainer,
							{
								backgroundColor: "rgba(255, 165, 0, 0.2)",
								padding: 10,
								borderColor: "orange",
								borderWidth: 1,
							},
						]}
					>
						<View style={styles.iconBackground}>
							<TouchableOpacity
								onPress={handleNavigation("Recomendações")}
							>
								<Ionicons
									name="bulb-outline"
									size={24}
									color="white"
								/>
							</TouchableOpacity>
						</View>
						<View style={styles.paragraphTextContainer}>
							<Text
								style={[
									styles.paragraphTitle,
									{ marginTop: 10 },
								]}
							>
								O que você precisa fazer?
							</Text>
							<Text
								style={[
									styles.paragraphDescription,
									{ marginBottom: 10 },
								]}
							>
								Veja as recomendações!
							</Text>
						</View>
					</View>

					<View style={{ marginTop: 10, maxWidth: "100%" }}>
						<View style={styles.paragraphContainer}>
							<View style={styles.iconBackground}>
								<Ionicons
									name="chatbox-ellipses-outline"
									size={24}
									color="white"
								/>
							</View>
							<View style={styles.paragraphTextContainer}>
								<Text style={styles.paragraphTitle}>
									Como está sua experiência com o app?
								</Text>
							</View>
						</View>
						<FeedbackPage />
					</View>

					{/*This is a small blank paragraph to make the scroll view go all the way down*/}
					<View style={{ height: 50 }} />
					{/*This is a small blank paragraph to make the scroll view go all the way down*/}
				</ScrollView>
			</View>
		</View>
	);
};

export default HomeScreen;
