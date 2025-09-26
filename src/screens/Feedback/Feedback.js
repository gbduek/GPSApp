import { useState, useContext } from "react";
import {
	View,
	TextInput,
	Text,
	Alert,
	TouchableOpacity,
	Keyboard,
	TouchableWithoutFeedback,
} from "react-native";
import DataContext from "../../../Context/DataContext";
import axios from "axios";
import { ScrollView } from "react-native";
import styles from "./styles";

const FeedbackPage = () => {
	const [feedback, setFeedback] = useState("");
	const [isFocused, setIsFocused] = useState(false); //Checks if the input of the note is active
	const [loading, setLoading] = useState(false);
	const { token, userName, userMail } = useContext(DataContext);
	const [balls, setBalls] = useState(
		Array.from({ length: 10 }, () => ({ selected: false }))
	);
	let body = null;

	const handleSendFeedback = () => {
		const sendData = async () => {
			const totalEval = balls.reduce(
				(count, item) => (item.selected ? count + 1 : count),
				0
			);

			if (!feedback) {
				body = { nota: totalEval };
			} else {
				const template = `Olá GPS,\n
                Você recebeu a seguinte mensagem de ${userName}:\n
                ${feedback}\n
                Esta mensagem foi enviada por:\n
                Nome GPS: ${userName}\n
            E-mail cadastrado GPS: ${userMail}`;
				body = { nota: totalEval, descricao: template };
			}

			setLoading(true);

			try {
				const response = await axios.post(
					"https://api3.gps.med.br/api/feedback/",
					body,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				console.log("Save successful:", response.data);
			} catch (error) {
				console.error("Error saving data:", error);
			} finally {
				console.log("Feedback enviado!");
				Alert.alert("Obrigado pelo seu feedback!");
				setLoading(false);
				setFeedback("");
				setName("");
				Keyboard.dismiss();
			}
		};

		sendData();
	};

	const renderBalls = () => {
		return [...Array(10)].map((_, index) => (
			<TouchableOpacity key={index} onPress={() => handleBalls(index)}>
				<View
					style={[
						styles.ball,
						{
							backgroundColor: getBallColor(
								index,
								balls[index].selected
							),
						},
						{ justifyContent: "center" },
					]}
				>
					<Text style={{ alignSelf: "center", color: "white" }}>
						{index + 1}
					</Text>
				</View>
			</TouchableOpacity>
		));
	};

	const handleBalls = (index) => {
		setBalls((prevBalls) =>
			prevBalls.map((item, i) => ({
				...item,
				selected: i <= index,
			}))
		);
	};

	const getBallColor = (index, selected) => {
		if (!selected) return "#9e9e9e"; // unselected is gray
		const green = Math.floor((index / 9) * 255);
		const red = 255 - green;
		return `rgb(${red},${green},0)`;
	};

	return (
		<View style={{ flex: 1 }}>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View style={{ flex: 1 }}>
					<ScrollView style={{ flex: 1, backgroundColor: "white" }}>
						<View style={styles.container}>
							<Text
								style={{
									fontSize: 16,
									color: "orange",
									fontWeight: "bold",
									marginBottom: 10,
									marginTop: 5,
								}}
							>
								Avaliar sua experiência na GPS MED
							</Text>

							<View style={styles.starContainer}>
								{renderBalls()}
							</View>

							<TextInput
								style={[
									styles.input,
									styles.feedbackInput,
									isFocused ? { marginBottom: "50%" } : null,
								]}
								placeholder="Seu Feedback (opcional)"
								value={feedback}
								onChangeText={setFeedback}
								onFocus={() => setIsFocused(true)}
								onBlur={() => setIsFocused(false)}
								multiline
							/>

							<TouchableOpacity
								style={styles.submitButton}
								onPress={handleSendFeedback}
							>
								<Text style={styles.submitButtonText}>
									Enviar
								</Text>
							</TouchableOpacity>

							<Text style={styles.note}>
								Nós agradecemos o seu feedback!
							</Text>
						</View>
					</ScrollView>
				</View>
			</TouchableWithoutFeedback>
		</View>
	);
};

export default FeedbackPage;
