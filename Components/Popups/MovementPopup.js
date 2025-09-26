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
import Picker from "../UIComp/Picker";
import WarnModal from "../WarnModal";

const MovementPopup = ({ isVisible, onClose, refreshDiary }) => {
	const { token, userLogged } = useContext(DataContext);
	const [date, setDate] = useState(new Date());
	const [showDatePicker, setShowDatePicker] = useState(false);
	const [selectedActivity, setSelectedActivity] = useState({
		nome: "Selecionar Atividade",
		id: "",
	});
	const [activities, setActivities] = useState([]);
	const [loading, setLoading] = useState(true);
	const [intensity, setIntensity] = useState(5);
	const [note, setNote] = useState("");
	const [isFocused, setIsFocused] = useState(false); //Checks if the input of the note is active
	const [warningVisible, setWarningVisible] = useState(false);
	const [warningMessage, setWarningMessage] = useState("");
	const [warningType, setWarningType] = useState("");

	const diaryId = "ee8cf8bb-36ff-4838-883b-75179867d095";

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
					`https://api3.gps.med.br/API/diario/dados/${userLogged}/ee8cf8bb-36ff-4838-883b-75179867d095`,
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
		if (
			!selectedActivity ||
			selectedActivity.nome == "Selecionar Atividade"
		) {
			showWarning("Por favor, selecione uma atividade", "error");
			return;
		}

		setLoading(true);

		try {
			const postData = {
				alimento: null,
				duracao: 0,
				emocao: null,
				pessoa: userLogged,
				pessoaFisica: userLogged,
				tipoDiario: diaryId,
				observacao: note,
				inicio: date.toISOString(),
				fim: date.toISOString(),
				intensidade: intensity * 10,
				atividade: selectedActivity.id,
			};

			await axios.post("https://api3.gps.med.br/API/diario", postData, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			onClose(); // Close the popup after successful registration
		} catch (error) {
			console.error("Error registering movement:", error);
			showWarning(
				"Ocorreu um erro ao registrar. Por favor tente novamente",
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

							<Text style={styles.subtitle}>Atividade</Text>
							{loading ? (
								<ActivityIndicator
									size="large"
									color="orange"
								/>
							) : (
								<Picker
									options={activities.map(
										(activity) => activity.nome
									)}
									selectedOption={selectedActivity.nome}
									onSelect={(option) => {
										const selected = activities.find(
											(activity) =>
												activity.nome === option
										);
										setSelectedActivity({
											nome: selected.nome,
											id: selected.id,
										});
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

export default MovementPopup;
