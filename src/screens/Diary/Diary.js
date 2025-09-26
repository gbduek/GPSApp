import React, { useState, useEffect, useCallback, useContext } from "react";
import {
	View,
	Text,
	Image,
	FlatList,
	ScrollView,
	ActivityIndicator,
	TouchableOpacity,
	Platform,
	RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { FontAwesome } from "@expo/vector-icons";
import EmotionPopup from "../../../Components/Popups/EmotionPopup";
import MovementPopup from "../../../Components/Popups/MovementPopup";
import SymptomPopup from "../../../Components/Popups/SymptomPopup";
import DiHist from "../../../Components/DiHist";
import Header from "../../../Components/Header";
import GraphDiary from "../../../Components/GraphDiary";
import Picker from "../../../Components/UIComp/Picker";
import DataContext from "../../../Context/DataContext";
import styles from "./styles";
import CustomTabBar from "../../routes/CustomTabNav/CustomTabBar";

const Diary = () => {
	const { token, userLogged } = useContext(DataContext);
	const [loading, setLoading] = useState(false);
	const [diaryId, setDiaryId] = useState(
		"a8772285-cc12-47c0-b947-eeac0a790b7a"
	);
	const [selectedOption, setSelectedOption] = useState("de Emoções");
	const [isEmotionPopupOpen, setIsEmotionPopupOpen] = useState(false);
	const [isMovementPopupOpen, setIsMovementPopupOpen] = useState(false);
	const [isSymptomPopupOpen, setIsSymptomPopupOpen] = useState(false);
	const [histSizeH, setHistSizeH] = useState();
	const [imageUri, setImageUri] = useState(
		"https://api3.gps.med.br/api/upload/image?vinculo=a8772285-cc12-47c0-b947-eeac0a790b7a"
	);
	const [description, setDescription] = useState(
		"Registre aqui suas fontes de estresse e suas emoções, positivas e negativas."
	);
	const [refreshing, setRefreshing] = useState(false);
	const [diaryEntries, setDiaryEntries] = useState([]);

	const options = ["de Emoções", "de Movimento", "de Sintomas"];

	const fetchDiaryEntries = async () => {
		try {
			setLoading(true);
			const response = await axios.post(
				"https://api3.gps.med.br/API/diario/diarios",
				{
					pessoa: userLogged,
					tipoDiario: diaryId,
					dadoTipoDiario: null,
					dataInicio: null,
					dataFinal: null,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			const entries = response.data;
			setDiaryEntries(entries);
		} catch (error) {
			console.error("Error fetching diary entries:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchDiaryEntries();
	}, [userLogged, diaryId, refreshing]);

	useEffect(() => {
		if (Platform.OS === "ios") {
			setHistSizeH(300);
		}
	}, []);

	// Function to handle option change
	const handleOptionChange = (option) => {
		setSelectedOption(option);
		updateImageUriAndDescription(option);
		closeAllPopups();
	};

	const toggleEmotionPopup = () => setIsEmotionPopupOpen(!isEmotionPopupOpen);

	const toggleMovementPopup = () =>
		setIsMovementPopupOpen(!isMovementPopupOpen);

	const toggleSymptomPopup = () => setIsSymptomPopupOpen(!isSymptomPopupOpen);

	const closeAllPopups = () => {
		setIsEmotionPopupOpen(false);
		setIsMovementPopupOpen(false);
		setIsSymptomPopupOpen(false);
	};

	const updateImageUriAndDescription = (option) => {
		switch (option) {
			case "de Emoções":
				setDiaryId("a8772285-cc12-47c0-b947-eeac0a790b7a");
				setImageUri(
					"https://api3.gps.med.br/api/upload/image?vinculo=a8772285-cc12-47c0-b947-eeac0a790b7a"
				);
				setDescription(
					"Registre aqui suas fontes de estresse e suas emoções, positivas e negativas."
				);
				break;
			case "de Movimento":
				setDiaryId("ee8cf8bb-36ff-4838-883b-75179867d095");
				setImageUri(
					"https://api3.gps.med.br/api/upload/image?vinculo=ee8cf8bb-36ff-4838-883b-75179867d095"
				);
				setDescription(
					"Registre aqui suas atividades, sejam de lazer, esporte ou malhação."
				);
				break;
			case "de Sintomas":
				setDiaryId("a0a1d9b5-2268-4aed-9040-44fb3d88975e");
				setImageUri(
					"https://api3.gps.med.br/api/upload/image?vinculo=a0a1d9b5-2268-4aed-9040-44fb3d88975e"
				);
				setDescription(
					"Registre aqui seus sintomas, sejam de problemas agudos ou crônicos."
				);
				break;
			default:
				setDiaryId("a8772285-cc12-47c0-b947-eeac0a790b7a");
				setImageUri(
					"https://api3.gps.med.br/api/upload/image?vinculo=a8772285-cc12-47c0-b947-eeac0a790b7a"
				);
				setDescription(
					"Registre aqui suas fontes de estresse e suas emoções, positivas e negativas."
				);
				break;
		}
	};

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		// Assuming DiHist and GraphDiary have internal fetch logic, this will refresh them.
		setTimeout(() => setRefreshing(false), 2000); // Optional: simulate loading
	}, []);

	const refreshDiary = () => {
		setRefreshing(true);
		setTimeout(() => {
			setRefreshing(false);
		}, 2000); // Optional: simulate loading
	};

	const renderPopup = () => {
		switch (selectedOption) {
			case "de Emoções":
				return (
					<EmotionPopup
						isVisible={isEmotionPopupOpen}
						onClose={() => setIsEmotionPopupOpen(false)}
						refreshDiary={refreshDiary}
					/>
				);
			case "de Movimento":
				return (
					<MovementPopup
						isVisible={isMovementPopupOpen}
						onClose={() => setIsMovementPopupOpen(false)}
						refreshDiary={refreshDiary}
					/>
				);
			case "de Sintomas":
				return (
					<SymptomPopup
						isVisible={isSymptomPopupOpen}
						onClose={() => setIsSymptomPopupOpen(false)}
						refreshDiary={refreshDiary}
					/>
				);
			default:
				return null;
		}
	};

	const renderItem = ({ item }) => {
		switch (item.type) {
			case "header":
				return (
					<View>
						<View style={styles.headerContainer}>
							<FontAwesome
								name={"book"}
								size={32}
								color="orange"
							/>
							<Text style={styles.pageTitle}>Diários</Text>
						</View>
						<Image
							source={{ uri: imageUri }}
							style={styles.image}
						/>
						<Text style={styles.descriptionText}>
							{description}
						</Text>
					</View>
				);
			case "selector":
				return (
					<Picker
						options={options}
						selectedOption={selectedOption}
						onSelect={handleOptionChange}
					/>
				);
			case "geometricShape2":
				return (
					<View style={styles.geometricShape}>
						<Text style={styles.shapeTitle}>
							Diário {selectedOption}
						</Text>
						<ScrollView style={{ height: histSizeH }}>
							<DiHist
								DiaryId={diaryId}
								refreshing={refreshing}
								entries={diaryEntries}
							/>
						</ScrollView>
					</View>
				);
			case "geometricShape1":
				return (
					<View style={styles.geometricShape}>
						<Text
							style={[styles.shapeTitle, { marginBottom: -10 }]}
						>
							Gráfico {selectedOption}
						</Text>
						<ScrollView>
							<View style={{ height: 10 }} />
							<GraphDiary
								DiaryId={diaryId}
								entries={diaryEntries}
							/>
						</ScrollView>
					</View>
				);
			default:
				return null;
		}
	};

	const data = [
		{ id: "header", type: "header" },
		{ id: "selector", type: "selector" },
		{ id: "geometricShape1", type: "geometricShape1" },
		{ id: "geometricShape2", type: "geometricShape2" }, // New item for GraphDiary
	];

	if (loading) {
		return (
			<ActivityIndicator
				style={{ flex: 1 }}
				size="large"
				color="orange"
			/>
		);
	}

	return (
		<SafeAreaView edges={[]} style={{ flex: 1 }}>
			<Header />
			<View style={styles.container}>
				<FlatList
					data={data}
					keyExtractor={(item) => item.id}
					renderItem={renderItem}
					contentContainerStyle={styles.flatListContent}
					scrollIndicatorInsets={{ right: 1 }}
					refreshControl={
						<RefreshControl
							refreshing={refreshing}
							onRefresh={onRefresh}
							tintColor="orange"
						/>
					}
				/>

				{isEmotionPopupOpen && renderPopup()}
				{isMovementPopupOpen && renderPopup()}
				{isSymptomPopupOpen && renderPopup()}

				<TouchableOpacity
					style={styles.addButton}
					onPress={() =>
						selectedOption === "de Emoções"
							? toggleEmotionPopup()
							: selectedOption === "de Movimento"
							? toggleMovementPopup()
							: toggleSymptomPopup()
					}
				>
					<FontAwesome name="plus" size={20} color="white" />
				</TouchableOpacity>
			</View>
			<CustomTabBar />
		</SafeAreaView>
	);
};

export default Diary;
