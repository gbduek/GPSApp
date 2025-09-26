import React, { useContext, useState, useEffect } from "react";
import {
	View,
	Text,
	StyleSheet,
	ActivityIndicator,
	ScrollView,
	TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import DataContext from "../../Context/DataContext";
import Header from "../../Components/Header";
import Popup from "../../Components/Popups/Popup";
import Compass from "../../assets/Icons/Compass";
import Picker from "../../Components/UIComp/Picker";
import CustomTabBar from "../routes/CustomTabNav/CustomTabBar";

const colorMap = {
	1: "#4CAF50", // Grau 1 -> Green
	2: "#FFE500", // Grau 2 -> Yellow
	3: "#EF4040", // Grau 3 -> Red
};

const Recom = () => {
	const { token, userLogged } = useContext(DataContext);
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [selectedRec, setSelectedRec] = useState(null);
	const [isPopupVisible, setPopupVisible] = useState(false);
	const [selectedRisk, setSelectedRisk] = useState(
		"Todos os níveis de risco"
	);
	const [selectedDimen, setSelectedDimen] = useState({
		title: "Todas as dimensões",
		id: "",
	});
	const [riskLevel, setRiskLevel] = useState(0);

	const riskOptions = [
		"Todos os níveis de risco",
		"Alto risco",
		"Médio risco",
		"Baixo risco",
	];
	const dimenOptions = [
		{ title: "Todas as dimensões", id: "" },
		{ title: "Mente", id: "40c6eaad-8815-4cbc-9caf-78f081f03674" },
		{ title: "Estilo de Vida", id: "7ed63315-ff7b-4658-b488-7655487e2845" },
		{ title: "Corpo", id: "20118275-8791-469e-b9f5-3210f990dd01" },
	];

	const handleRiskSelect = (option) => {
		setSelectedRisk(option);
		const riskMap = {
			"Todos os níveis de risco": 0,
			"Alto risco": 3,
			"Médio risco": 2,
			"Baixo risco": 1,
		};
		setRiskLevel(riskMap[option]);
		setError(false);
	};

	const handleDimenSelect = (selectedTitle) => {
		const selected = dimenOptions.find(
			(option) => option.title === selectedTitle
		);
		setSelectedDimen(selected || { title: "", id: "" });
		setError(false);
	};

	const getTransformation = (grau) => {
		switch (grau) {
			case 1:
				return "rotate(980 2560 2560)"; // Green
			case 2:
				return "rotate(1215 2560 2560)"; // Yellow
			case 3:
				return ""; // Red, no transformation
			default:
				return "";
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true); // Start loading indicator
			try {
				if (!token || !userLogged) {
					console.log("Token or userLogged not found");
					return;
				}

				const response = await axios.post(
					"https://api3.gps.med.br/API/Recomendacoes",
					{
						user: userLogged,
						indicador: "",
						risco: riskLevel,
						tipo: selectedDimen.id,
						filter: "",
					},
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				setData(response.data);
				setLoading(false); // Stop loading indicator on successful data fetch
			} catch (error) {
				console.error("Error fetching data:", error);
				setError(error);
				setLoading(false); // Stop loading indicator on error
			}
		};

		fetchData();
	}, [token, userLogged, riskLevel, selectedDimen]);

	const showPopup = (rec) => {
		setSelectedRec(rec);
		setPopupVisible(true);
	};

	const hidePopup = () => {
		setPopupVisible(false);
		setSelectedRec(null);
	};

	const renderItems = () => {
		if (loading) {
			return (
				<ActivityIndicator
					size="large"
					color="orange"
					style={styles.loadingIndicator}
				/>
			);
		}

		if (error) {
			return (
				<View>
					<View style={styles.titleContainer}>
						<Ionicons
							name="bulb"
							size={30}
							color={"orange"}
							style={styles.icon}
						/>
						<Text style={styles.title}>Recomendações</Text>
					</View>
					<View style={styles.pickerContainer}>
						<Picker
							options={dimenOptions.map((option) => option.title)} // Pass array of titles
							selectedOption={selectedDimen.title} // Display the selected title
							onSelect={handleDimenSelect}
						/>
						<Picker
							options={riskOptions}
							selectedOption={selectedRisk}
							onSelect={handleRiskSelect}
						/>
					</View>
					<View style={styles.errorContainer}>
						<Text style={styles.errorText}>
							Não foi encontrada nenhuma recomendação nestes
							parâmetros. Vá até suas dimensões e faça um novo
							registro!
						</Text>
					</View>
				</View>
			);
		}

		if (!data || data.length === 0) {
			return (
				<View style={styles.emptyContainer}>
					<Text style={styles.emptyText}>
						Nada para mostrar aqui agora!
					</Text>
				</View>
			);
		}

		return (
			<View>
				<View style={styles.titleContainer}>
					<Ionicons
						name="bulb"
						size={30}
						color={"orange"}
						style={styles.icon}
					/>
					<Text style={styles.title}>Recomendações</Text>
				</View>
				<View style={styles.pickerContainer}>
					<Picker
						options={dimenOptions.map((option) => option.title)} // Pass array of titles
						selectedOption={selectedDimen.title} // Display the selected title
						onSelect={handleDimenSelect}
					/>
					<Picker
						options={riskOptions}
						selectedOption={selectedRisk}
						onSelect={handleRiskSelect}
					/>
				</View>
				{data &&
					data.map((item, index) => (
						<View key={index} style={styles.itemContainer}>
							<View style={styles.itemContent}>
								<Text style={styles.indicador}>
									{item.indicador}
								</Text>
								<Text style={styles.tipo}>{item.tipo}</Text>
								{item.recomendacoes &&
									item.recomendacoes.map((rec, idx) => (
										<View
											key={idx}
											style={styles.recommendation}
										>
											{/* Render Compass icon based on Grau */}
											<Compass
												color={colorMap[rec.grau]}
												transf={getTransformation(
													rec.grau
												)}
											/>
											<Text
												style={
													styles.recommendationText
												}
											>
												{rec.nome}
											</Text>
											{/* Button to show popup */}
											<TouchableOpacity
												style={styles.button}
												onPress={() => showPopup(rec)}
											>
												<Ionicons
													name="arrow-forward"
													size={24}
													color="white"
												/>
											</TouchableOpacity>
										</View>
									))}
							</View>
						</View>
					))}
				<View style={styles.footer} />
			</View>
		);
	};

	return (
		<SafeAreaView edges={[]} style={{ flex: 1, backgroundColor: "white" }}>
			<Header />
			{/* Scrollable content with padding for tab bar */}
			<ScrollView contentContainerStyle={styles.scrollContainer}>
				{renderItems()}
				{/* Render Popup if visible */}
				<Popup
					isVisible={isPopupVisible}
					data={selectedRec}
					onClose={hidePopup}
				/>
			</ScrollView>
			<CustomTabBar />
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	loadingIndicator: {
		marginTop: 16,
		marginBottom: 16,
	},
	errorContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	errorText: {
		fontSize: 16,
		color: "red",
		textAlign: "center",
	},
	emptyContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	emptyText: {
		fontSize: 18,
		color: "#666",
		textAlign: "center",
	},
	pickerContainer: {
		padding: 10,
		backgroundColor: "white",
	},
	scrollContainer: {
		flexGrow: 1,
		padding: 16,
		backgroundColor: "white",
	},
	titleContainer: {
		flexDirection: "row", // Align items horizontally
		alignItems: "center", // Center items vertically
		justifyContent: "center", // Center items horizontally within container
		marginBottom: 16,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		color: "orange",
	},
	icon: {
		marginRight: 5, // Space between icon and title
	},
	itemContainer: {
		marginBottom: 16,
		backgroundColor: "#ffff",
		borderRadius: 8,
		padding: 16,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	itemContent: {
		flex: 1,
	},
	indicador: {
		fontSize: 18,
		fontWeight: "bold",
		color: "orange",
	},
	tipo: {
		fontSize: 14,
		color: "#666",
	},
	recommendation: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 8,
		backgroundColor: "#f0f0f0",
		padding: 8,
		borderRadius: 4,
	},
	recommendationText: {
		fontSize: 14,
		flex: 1,
		marginLeft: 10,
		fontWeight: "bold",
	},
	button: {
		backgroundColor: "orange",
		padding: 10,
		borderRadius: 5,
		marginLeft: 10,
		alignItems: "center",
	},
	buttonText: {
		color: "#fff",
		fontWeight: "bold",
	},
	footer: {
		height: 200, // Adjust as needed to enable scrolling
	},
});

export default Recom;
