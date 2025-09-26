import React, { useState, useEffect, useContext } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	TextInput,
	Modal,
	ActivityIndicator,
	TouchableWithoutFeedback,
	Keyboard,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Slider from "@react-native-community/slider";
import axios from "axios";
import DataContext from "../../Context/DataContext";
import { FontAwesome } from "@expo/vector-icons";
import ListSymptoms from "../Popups/ListSymptoms";
import WarnModal from "../WarnModal";

const SymptomPopup = ({ isVisible, onClose, refreshDiary }) => {
	const { token, userLogged } = useContext(DataContext);
	const [date, setDate] = useState(new Date());
	const [showDatePicker, setShowDatePicker] = useState(false);
	const [selectedActivity, setSelectedActivity] = useState({
		nome: "",
		id: "",
	});
	const [activities, setActivities] = useState([]);
	const [loading, setLoading] = useState(true);
	const [intensity, setIntensity] = useState(5);
	const [note, setNote] = useState("");
	const [isFocused, setIsFocused] = useState(false); //Checks if the input of the note is active
	const [modalVisible, setModalVisible] = useState(false);
	const [warningVisible, setWarningVisible] = useState(false);
	const [warningMessage, setWarningMessage] = useState("");
	const [warningType, setWarningType] = useState("");

	const diaryId = "a0a1d9b5-2268-4aed-9040-44fb3d88975e";

	const onDateChange = (selectedDate) => {
		const currentDate = selectedDate || date;
		setDate(currentDate);
		setShowDatePicker(false);
	};

	const showWarning = (message, type) => {
		setWarningMessage(message);
		setWarningVisible(true);
		setWarningType(type);
	};

	useEffect(() => {
		const fetchActivities = async () => {
			try {
				const response = await axios.get(
					`https://api3.gps.med.br/API/diario/dados/${userLogged}/a0a1d9b5-2268-4aed-9040-44fb3d88975e`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				setActivities(response.data);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching activities:", error);
				setLoading(false);
			}
		};

		fetchActivities();
	}, []);

	const handleRegister = async () => {
		if (!selectedActivity || !selectedActivity.id) {
			showWarning("Por favor, selecione um sintoma", "error");
			return;
		}

		setLoading(true);

		try {
			const postData = {
				alimento: null,
				atividade: null,
				duracao: 0,
				emocao: null,
				pessoa: userLogged,
				pessoaFisica: userLogged,
				tipoDiario: diaryId,
				observacao: note,
				inicio: date.toISOString(),
				fim: date.toISOString(),
				intensidade: intensity * 10,
				sintomas: [selectedActivity.id],
			};

			await axios.post("https://api3.gps.med.br/API/diario", postData, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			//Alert.alert("Sucesso", "Registro salvo com sucesso!");
			//showWarning("Registro salvo com sucesso!", "success");
			onClose(); // Close the popup after successful registration
		} catch (error) {
			console.error("Error registering movement:", error);
			showWarning(
				"Ocorreu um erro ao registrar. Por favor, tente novamente.",
				"error"
			);
		} finally {
			setLoading(false);
			refreshDiary();
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
								<Text style={styles.dateText}>
									{date.toLocaleString()}
								</Text>
							</TouchableOpacity>
							<DateTimePickerModal
								isVisible={showDatePicker}
								date={date}
								mode="datetime"
								onConfirm={onDateChange}
								onCancel={() => setShowDatePicker(false)}
								locale="pt-BR"
							/>

							<Text style={styles.subtitle}>Sintoma</Text>
							{loading ? (
								<ActivityIndicator
									size="large"
									color="orange"
								/>
							) : (
								<TouchableOpacity
									style={{
										flexDirection: "row",
										justifyContent: "space-between",
										alignItems: "center",
										padding: 10,
										borderWidth: 2,
										borderColor: "orange",
										borderRadius: 25,
										marginBottom: 20,
									}}
									onPress={() => setModalVisible(true)}
								>
									<Text
										style={{
											fontSize: 16,
											color: "orange",
											fontWeight: "bold",
										}}
									>
										{selectedActivity.nome
											? selectedActivity.nome
											: "Selecionar Sintoma"}
									</Text>
								</TouchableOpacity>
							)}

							{modalVisible && (
								<ListSymptoms
									symptoms={activities}
									onClose={() => setModalVisible(false)}
									onSelectSymptom={(selectedSymptom) => {
										setSelectedActivity({
											nome: selectedSymptom.nome,
											id: selectedSymptom.id,
										});
										setModalVisible(false);
									}}
								/>
							)}

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
		borderWidth: 1.5,
		borderColor: "orange",
		borderRadius: 5,
		marginBottom: 20,
	},
	dateText: {
		fontSize: 16,
		color: "black",
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
		borderColor: "orange",
		borderWidth: 1.5,
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
});

export default SymptomPopup;
