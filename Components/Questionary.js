import React, { useState, useEffect, useContext } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	TextInput,
	ActivityIndicator,
	Animated,
} from "react-native";
import axios from "axios";
import DataContext from "../Context/DataContext";
import styles from "./styles/questionaryStyles";

const api = axios.create({
	baseURL: "https://api3.gps.med.br/API/",
});

const Questionary = ({ route, navigation }) => {
	const { type, title, id, examples = [] } = route.params;
	let [questions, setQuestions] = useState([]);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [formData, setFormData] = useState({
		selectedOptions: {},
		textInputs: {},
	});
	const [loading, setLoading] = useState(true);
	const { token, userLogged } = useContext(DataContext);
	const [fadeAnim] = useState(new Animated.Value(0)); // Animation for fade-in effect
	const [progressAnim] = useState(new Animated.Value(0)); // Animation for progress bar
	const [renderSend, setRenderSend] = useState(false);

	useEffect(() => {
		const fetchQuestions = async () => {
			try {
				const response = await api.get(
					`Medicao/GetQuestionariosOpcoes/${id}`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				let fetchedQuestions = response.data.flatMap(
					(questionary) => questionary.questoes
				);

				//Checks if the questionary is the one about Peso and Altura (to remove the IMC)
				if (id === "04870942-8621-45e4-a781-d1f58f99ecd1") {
					fetchedQuestions = fetchedQuestions.filter(
						(q) => q.questao !== "IMC"
					);
				}

				setQuestions(fetchedQuestions);
				setLoading(false);
				animateFadeIn();
			} catch (error) {
				console.error("Error fetching questions:", error);
				setLoading(false);
			}
		};

		if (token) {
			fetchQuestions();
		}
	}, [id]);

	const handleSave = async () => {
		let unansweredQuestions;

		// Determine unanswered questions based on the question type
		if (type === "Corpo") {
			console.log("Handling text inputs for Corpo type");
			unansweredQuestions = questions.filter(
				(q) => !formData.textInputs[q.id]
			);
		} else {
			unansweredQuestions = questions.filter(
				(q) => !formData.selectedOptions[q.id]
			);
		}

		// Additional filter based on the specific id condition
		if (id === "04870942-8621-45e4-a781-d1f58f99ecd1") {
			unansweredQuestions = unansweredQuestions.filter(
				(q) => q.questao !== "IMC"
			);
		}

		// If there are unanswered questions, show a validation error
		if (unansweredQuestions.length > 0 && type !== "Corpo") {
			setValidationError(
				"Por favor, responda todas as perguntas antes de salvar."
			);
			return;
		}

		// Set loading to true while saving
		setLoading(true);

		// Prepare the data for the API call
		const Medidores =
			type === "Corpo"
				? Object.keys(formData.textInputs).map((questionId) => ({
						Medidor: questionId,
						Valor: formData.textInputs[questionId],
				  }))
				: Object.keys(formData.selectedOptions).map((questionId) => ({
						Medidor: questionId,
						Opcao: formData.selectedOptions[questionId],
				  }));

		// Replace `userLogged` with actual user context or variable
		const body = {
			DataFinal: new Date().toISOString(),
			DataInicial: new Date().toISOString(),
			Indicador: id,
			jejum: false,
			Medidores,
			PessoaFisica: userLogged,
		};

		try {
			console.log("Saving data:", body);
			console.log("Text inputs:", formData.textInputs);
			const response = await api.post("Medicao/SaveMedicao/", body, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			console.log("Save successful:", response.data);
			navigation.goBack();
		} catch (error) {
			console.error("Error saving data:", error);
		} finally {
			setLoading(false);
		}
	};

	const animateFadeIn = () => {
		fadeAnim.setValue(0);
		Animated.timing(fadeAnim, {
			toValue: 1,
			duration: 500,
			useNativeDriver: true,
		}).start();
	};

	const animateProgress = () => {
		Animated.timing(progressAnim, {
			toValue: (currentQuestionIndex + 1) / questions.length,
			duration: 300,
			useNativeDriver: false,
		}).start();
	};

	const handleOptionSelect = (questionId, optionId) => {
		if (type === "Corpo") {
			console.warn("Option selection is not applicable for Corpo type");
		} else {
			setFormData((prev) => ({
				...prev,
				selectedOptions: {
					...prev.selectedOptions,
					[questionId]: optionId,
				},
			}));
		}

		if (currentQuestionIndex < questions.length - 1) {
			setCurrentQuestionIndex(currentQuestionIndex + 1);
			animateFadeIn();
			// If it's the last question, handle submission or completion
			if (currentQuestionIndex === questions.length - 2) {
				setRenderSend(true);
			}
			animateProgress();
		}
	};

	const handleNextTextQuestion = () => {
		if (currentQuestionIndex < questions.length - 1) {
			setCurrentQuestionIndex(currentQuestionIndex + 1);
			animateFadeIn();
			animateProgress();

			// Se for penúltima, prepara o botão de envio
			if (currentQuestionIndex === questions.length - 2) {
				setRenderSend(true);
			}
		}
	};

	const handleTextInputChange = (questionId, text) => {
		setFormData((prev) => ({
			...prev,
			textInputs: {
				...prev.textInputs,
				[questionId]: text,
			},
		}));
	};

	const buttonsSend = () => {
		return (
			<View
				style={{
					flexDirection: "row",
					justifyContent: "center",
					padding: 20,
				}}
			>
				<TouchableOpacity
					style={[
						{
							backgroundColor: "grey",
						},
						styles.send_cancelButton,
					]}
					onPress={() => navigation.goBack()}
				>
					<Text
						style={{
							color: "white",
							fontWeight: "bold",
							fontSize: 20,
						}}
					>
						Cancelar
					</Text>
				</TouchableOpacity>
				<View style={{ width: 20 }} />
				<TouchableOpacity
					style={[
						{
							backgroundColor: "orange",
						},
						styles.send_cancelButton,
					]}
					onPress={handleSave}
				>
					<Text
						style={{
							color: "white",
							fontWeight: "bold",
							fontSize: 20,
						}}
					>
						Salvar
					</Text>
				</TouchableOpacity>
			</View>
		);
	};

	const renderCurrentQuestion = () => {
		const currentQuestion = questions[currentQuestionIndex];

		if (type === "Corpo") {
			return (
				<Animated.View
					style={[styles.questionContainer, { opacity: fadeAnim }]}
				>
					<Text style={{ color: "orange", fontWeight: "bold" }}>
						{questions.length} Perguntas
					</Text>

					{questions.map((question, index) => (
						<View
							key={question.id || index}
							style={{ marginBottom: 20 }}
						>
							<Text style={styles.question}>
								{question.questao}
							</Text>
							<TextInput
								style={styles.textInput}
								placeholder={
									examples[index % examples.length] ||
									"Digite sua resposta"
								}
								value={formData.textInputs[question.id] || ""}
								onChangeText={(text) =>
									handleTextInputChange(question.id, text)
								}
							/>
						</View>
					))}

					<View style={{ marginTop: 20 }}>{buttonsSend()}</View>
				</Animated.View>
			);
		}

		// Otherwise, render multiple choice question
		return (
			<Animated.View
				style={[styles.questionContainer, { opacity: fadeAnim }]}
			>
				<Text style={{ color: "orange", fontWeight: "bold" }}>
					{currentQuestionIndex + 1}/{questions.length}
				</Text>
				<Text style={styles.question}>{currentQuestion.questao}</Text>

				{currentQuestion.opcoes.map((option) => (
					<TouchableOpacity
						key={option.id}
						onPress={() =>
							handleOptionSelect(currentQuestion.id, option.id)
						}
					>
						<View
							style={[
								styles.optionCircle,
								formData.selectedOptions[currentQuestion.id] ===
									option.id && styles.selectedOptionCircle,
							]}
						>
							<Text
								style={[
									styles.optionText,
									formData.selectedOptions[
										currentQuestion.id
									] === option.id &&
										styles.selectedOptionText,
								]}
							>
								{option.opcao}
							</Text>
						</View>
					</TouchableOpacity>
				))}

				{renderSend && buttonsSend()}
			</Animated.View>
		);
	};

	if (loading) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size="large" color="orange" />
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<Text style={styles.pageTitle}>
				{type ? `${type} > ${title}` : title}
			</Text>

			<View style={styles.progressBarContainer}>
				<View style={styles.progressBarBackground}>
					<Animated.View
						style={[
							styles.progressBarFill,
							{
								width: progressAnim.interpolate({
									inputRange: [0, 1],
									outputRange: ["0%", "100%"],
								}),
							},
						]}
					/>
				</View>
			</View>

			{renderCurrentQuestion()}
		</View>
	);
};

export default Questionary;
