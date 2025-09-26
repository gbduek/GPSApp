import React, { useState, useContext } from "react";
import {
	View,
	Text,
	FlatList,
	StyleSheet,
	ActivityIndicator,
	Image,
	TouchableOpacity,
} from "react-native";
import axios from "axios";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DataContext from "../Context/DataContext";

const DiHist = ({ DiaryId, entries }) => {
	const { token } = useContext(DataContext);
	const [diaryEntries, setDiaryEntries] = useState(entries);
	const [loading, setLoading] = useState(false);

	const handleDelete = async (id) => {
		setLoading(true);
		try {
			await axios.delete(`https://api3.gps.med.br/API/diario/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setDiaryEntries(diaryEntries.filter((entry) => entry.id !== id));
		} catch (error) {
			console.error("Error deleting diary entry:", error);
		} finally {
			setLoading(false);
		}
	};

	const renderDiaryEntry = ({ item }) => {
		const emotionImages = {
			Medo: require("../assets/emotions/scared.png"),
			Ansiedade: require("../assets/emotions/anxious.png"),
			Alegria: require("../assets/emotions/happy.png"),
			Tristeza: require("../assets/emotions/sad.png"),
			Nojo: require("../assets/emotions/disgust.png"),
			Raiva: require("../assets/emotions/angry.png"),
		};

		const date = new Date(item.inicio);
		const formattedDate = date.toLocaleDateString(); // Formats date like "7/15/2024"
		const formattedTime = date.toLocaleTimeString([], {
			hour: "2-digit",
			minute: "2-digit",
		});

		return (
			<View style={styles.entryContainer}>
				{DiaryId === "a8772285-cc12-47c0-b947-eeac0a790b7a" && (
					<Image
						source={emotionImages[item.emocao.nome]}
						style={styles.emotionImage}
					/>
				)}
				<View style={styles.entryDetails}>
					<Text style={styles.entryDate}>
						{`${formattedDate} ${formattedTime}`}
					</Text>
					{DiaryId === "a8772285-cc12-47c0-b947-eeac0a790b7a" ? (
						<Text style={styles.entryTitle}>
							{item.emocao.nome}
						</Text>
					) : DiaryId === "ee8cf8bb-36ff-4838-883b-75179867d095" ? (
						<Text style={styles.entryTitle}>
							{item.atividades.length > 0
								? item.atividades[0]?.nome
								: "No Activity"}
						</Text>
					) : DiaryId === "a0a1d9b5-2268-4aed-9040-44fb3d88975e" ? (
						<Text style={styles.entryTitle}>
							{item.sintomas.length > 0
								? item.sintomas[0]?.nome
								: "No symptoms"}
						</Text>
					) : (
						<Text style={styles.entryTitle}>Default Title</Text>
					)}
					{item.observacao && <Text>{item.observacao}</Text>}
					<Text style={styles.entryParagraph}>
						Intensidade: {item.intensidade / 10}
					</Text>
				</View>
				<TouchableOpacity
					onPress={() => handleDelete(item.id)}
					style={styles.deleteIcon}
				>
					<MaterialCommunityIcons
						name="trash-can-outline"
						size={24}
						color="red"
					/>
				</TouchableOpacity>
			</View>
		);
	};

	return (
		<View style={styles.container}>
			{loading ? (
				<ActivityIndicator size="large" color="orange" />
			) : (
				<FlatList
					data={diaryEntries}
					renderItem={renderDiaryEntry}
					keyExtractor={(item) => item.id}
					contentContainerStyle={styles.listContent}
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
	},
	listContent: {
		paddingBottom: 20,
	},
	entryContainer: {
		flexDirection: "row",
		alignItems: "center",
		padding: 15,
		marginBottom: 15,
		backgroundColor: "#f9f9f9",
		borderRadius: 10,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 3,
		elevation: 3,
	},
	emotionImage: {
		width: 30,
		height: 29,
		borderRadius: 25,
		marginRight: 10,
	},
	entryDetails: {
		flex: 1,
	},
	entryDate: {
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 5,
		color: "#a9a9a9",
	},
	entryTitle: {
		fontSize: 18,
		fontWeight: "bold",
		color: "black",
		marginBottom: 5,
	},
	entryParagraph: {
		fontSize: 16,
		color: "orange",
		fontWeight: "bold",
	},
	deleteIcon: {
		padding: 5,
	},
});

export default DiHist;
