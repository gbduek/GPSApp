import React, { useContext, useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	TextInput,
	Modal,
	ActivityIndicator,
	Image,
	TouchableWithoutFeedback,
	Keyboard,
	Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import DateTimePickerModal from "react-native-modal-datetime-picker"; // For Android
import Slider from "@react-native-community/slider";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import DataContext from "../../Context/DataContext";
import WarnModal from "../WarnModal";

// Import images from assets folder
import alegriaImage from "../../assets/emotions/happy.png";
import ansiedadeImage from "../../assets/emotions/anxious.png";
import medoImage from "../../assets/emotions/scared.png";
import nojoImage from "../../assets/emotions/disgust.png";
import raivaImage from "../../assets/emotions/angry.png";
import tristezaImage from "../../assets/emotions/sad.png";

const emotions = [
	{
		name: "Alegria",
		color: "yellow",
		id: "268036ce-4eef-4a33-ad06-502c777b6cca",
		image: alegriaImage,
	},
	{
		name: "Ansiedade",
		color: "purple",
		id: "1bba6166-3184-4ed7-9de9-e6861106967e",
		image: ansiedadeImage,
	},
	{
		name: "Medo",
		color: "blue",
		id: "8a975e43-0de2-4b66-95b1-48a5738af2b0",
		image: medoImage,
	},
	{
		name: "Nojo",
		color: "green",
		id: "47dc3640-3b9a-4d09-86d9-2bdfb220fcd1",
		image: nojoImage,
	},
	{
		name: "Raiva",
		color: "red",
		id: "6e4ee370-6ce2-4745-bc9f-d5fb88547309",
		image: raivaImage,
	},
	{
		name: "Tristeza",
		color: "gray",
		id: "65af4d97-2942-4676-82fa-f15362b56ae7",
		image: tristezaImage,
	},
];

const EmotionPopup = ({ isVisible, onClose, refreshDiary }) => {
	const { token, userLogged } = useContext(DataContext);
	const [date, setDate] = useState(new Date());
	const [showDatePicker, setShowDatePicker] = useState(false);
	const [selectedEmotion, setSelectedEmotion] = useState(null);
	const [intensity, setIntensity] = useState(5);
	const [note, setNote] = useState("");
	const [isFocused, setIsFocused] = useState(false); //Checks if the input of the note is active
	const [loading, setLoading] = useState(false);
	const [warningVisible, setWarningVisible] = useState(false);
	const [warningMessage, setWarningMessage] = useState("");
	const [warningType, setWarningType] = useState("");

	const diaryId = "a8772285-cc12-47c0-b947-eeac0a790b7a";

	const onDateChange = (event, selectedDate) => {
		const currentDate = selectedDate || date;
		setShowDatePicker(false);
		setDate(currentDate);
	};

	// Android needs a separate handler for DateTimePickerModal
	const handleConfirm = (selectedDate) => {
		setDate(selectedDate); // Ensure the selected date is stored
		setShowDatePicker(false);
	};

	const showWarning = (message, type) => {
		setWarningMessage(message);
		setWarningVisible(true);
		setWarningType(type);
	};

	const formatDate = (date) => {
		return new Intl.DateTimeFormat("pt-BR", {
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
			hour: "2-digit",
			minute: "2-digit",
		}).format(date);
	};

	const handleRegister = async () => {
		if (!selectedEmotion) {
			showWarning("Por favor, selecione uma emoção", "error");
			return;
		}

		setLoading(true);

		try {
			const selectedEmotionId = emotions.find(
				(emotion) => emotion.name === selectedEmotion
			).id;
			const postData = {
				pessoa: userLogged,
				pessoaFisica: userLogged,
				tipoDiario: diaryId,
				observacao: note,
				inicio: date.toISOString(),
				fim: date.toISOString(),
				emocao: selectedEmotionId,
				atividade: null,
				alimento: null,
				sintomas: [],
				intensidade: intensity * 10,
				duracao: 0,
			};

			await axios.post("https://api3.gps.med.br/API/diario", postData, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			onClose(); // Close the popup after successful registration
		} catch (error) {
			console.error("Error registering emotion:", error);
			showWarning(
				"Ocorreu um erro ao registrar. Por favor, tente novamente.",
				"error"
			);
		} finally {
			refreshDiary();
			setLoading(false);
		}
	};

	return (
		<Modal
			visible={isVisible}
			transparent={true}
			animationType="fade"
			onRequestClose={onClose}
		>
			<TouchableWithoutFeedback onPress={onClose}>
				<View style={styles.modalBackdrop}>
					<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
						<View style={styles.modalContent}>
							<TouchableOpacity
								style={styles.closeButton}
								onPress={onClose}
							>
								<FontAwesome
									name="times"
									size={24}
									color="orange"
								/>
							</TouchableOpacity>
							<Text style={styles.popupTitle}>Novo Registro</Text>

							<Text style={styles.subtitle}>Data e Hora</Text>
							<TouchableOpacity
								onPress={() => setShowDatePicker(true)}
								style={styles.datePicker}
							>
								{Platform.OS === "android" ? (
									<Text style={styles.dateText}>
										{formatDate(date)}
									</Text>
								) : (
									<Text style={styles.dateText}>
										{date.toLocaleString()}
									</Text>
								)}
							</TouchableOpacity>
							{Platform.OS === "android" ? (
								<DateTimePickerModal
									isVisible={showDatePicker}
									date={date}
									mode="datetime"
									onConfirm={handleConfirm}
									onCancel={() => setShowDatePicker(false)}
									locale="pt-BR"
								/>
							) : (
								showDatePicker && (
									<DateTimePicker
										value={date}
										mode="datetime"
										display="default"
										onChange={onDateChange}
									/>
								)
							)}

							<Text style={styles.subtitle}>Emoção</Text>
							<View style={styles.emotionContainer}>
								{emotions.map((emotion) => (
									<TouchableOpacity
										key={emotion.name}
										style={styles.emotionButton}
										onPress={() =>
											setSelectedEmotion(emotion.name)
										}
									>
										<Image
											source={emotion.image}
											style={[
												styles.emotionImage,
												{
													opacity:
														selectedEmotion ===
														emotion.name
															? 1
															: 0.5,
												},
											]}
										/>
										<Text style={styles.emotionName}>
											{emotion.name}
										</Text>
									</TouchableOpacity>
								))}
							</View>

							<Text style={styles.subtitle}>Intensidade</Text>
							<Slider
								style={styles.slider}
								minimumValue={0}
								maximumValue={10}
								step={1}
								value={intensity}
								onValueChange={(value) => setIntensity(value)}
								minimumTrackTintColor="orange"
								maximumTrackTintColor="#000000"
								thumbTintColor="orange"
							/>
							<Text style={styles.intensityValue}>
								{intensity}
							</Text>

							<TextInput
								style={[
									styles.input,
									isFocused ? { marginBottom: "125%" } : null,
								]}
								placeholder="Digite aqui (opcional)"
								value={note}
								onChangeText={(text) => setNote(text)}
								onFocus={() => setIsFocused(true)}
								onBlur={() => setIsFocused(false)}
							/>

							<TouchableOpacity
								style={styles.registerButton}
								onPress={handleRegister}
								disabled={loading}
							>
								<Text style={styles.registerButtonText}>
									Registrar
								</Text>
								{loading && (
									<ActivityIndicator
										size="small"
										color="white"
										style={styles.loadingIndicator}
									/>
								)}
							</TouchableOpacity>
						</View>
					</TouchableWithoutFeedback>
				</View>
			</TouchableWithoutFeedback>
			<WarnModal
				isVisible={warningVisible}
				data={warningMessage}
				onClose={() => setWarningVisible(false)}
				type={warningType}
			/>
		</Modal>
	);
};

const styles = StyleSheet.create({
	closeButton: {
		alignSelf: "flex-end",
	},
	popupTitle: {
		fontSize: 20,
		fontWeight: "bold",
		color: "orange",
		marginBottom: 20,
		textAlign: "center",
	},
	subtitle: {
		fontSize: 16,
		fontWeight: "bold",
		color: "orange",
		marginBottom: 10,
	},
	datePicker: {
		padding: 10,
		borderWidth: 1,
		borderColor: "orange",
		borderRadius: 5,
		marginBottom: 20,
	},
	dateText: {
		fontSize: 16,
		color: "black",
	},
	emotionContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginBottom: 20,
	},
	emotionButton: {
		alignItems: "center",
	},
	emotionImage: {
		width: 30,
		height: 30,
		resizeMode: "stretch",
	},
	emotionName: {
		fontSize: 12,
		color: "black",
		marginTop: 5,
		textAlign: "center",
		fontWeight: "500",
	},
	slider: {
		width: "100%",
		height: 40,
		marginBottom: 10,
	},
	intensityValue: {
		fontSize: 16,
		textAlign: "center",
		marginBottom: 20,
	},
	input: {
		height: 40,
		borderColor: "gray",
		borderWidth: 1,
		borderRadius: 5,
		marginBottom: 20,
		paddingHorizontal: 10,
	},
	registerButton: {
		backgroundColor: "orange",
		padding: 10,
		borderRadius: 5,
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "center",
	},
	registerButtonText: {
		color: "white",
		fontWeight: "bold",
		fontSize: 16,
	},
	loadingIndicator: {
		marginLeft: 10,
	},
	modalBackdrop: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	modalContent: {
		width: "90%",
		backgroundColor: "white",
		borderRadius: 15,
		padding: 20,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
});

export default EmotionPopup;
