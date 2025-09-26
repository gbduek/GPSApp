import { useContext, useEffect, useState } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import axios from "axios";
import {
	MaterialCommunityIcons,
	Ionicons,
	FontAwesome5,
} from "@expo/vector-icons";
import DataContext from "../../../Context/DataContext";
import Compass from "../../../assets/Icons/Compass";
import Rings from "../../../Components/Rings";
import styles from "./styles";
import Popup from "../../../Components/Popups/Popup";
import Picker from "../../../Components/UIComp/Picker";

const PdS = () => {
	const { token, userLogged } = useContext(DataContext);
	const [loading, setLoading] = useState(true);
	const [categoriesData, setCategoriesData] = useState([]);
	const [filteredCategoriesData, setFilteredCategoriesData] = useState([]);
	const [isPopupVisible, setPopupVisible] = useState(false);
	const [popupData, setPopupData] = useState(null);
	const [popupGrau, setPopupGrau] = useState(null);
	const [riskLevel, setRiskLevel] = useState(null);
	const [selectedRisk, setSelectedRisk] = useState(
		"Todos os níveis de risco"
	);

	const riskOptions = [
		"Todos os níveis de risco",
		"Alto risco",
		"Médio risco",
		"Baixo risco",
	];

	const handleRiskSelect = (option) => {
		setSelectedRisk(option);
		const riskMap = {
			"Todos os níveis de risco": null,
			"Alto risco": 3,
			"Médio risco": 2,
			"Baixo risco": 1,
		};
		setRiskLevel(riskMap[option]);
	};

	const getFilteredData = (categoriesData) => {
		// Filter each category and its nested items based on the selected risk level
		return categoriesData
			.map((category) => ({
				...category,
				items: category.items
					.map((item) => ({
						...item,
						subs: item.subs.filter((sub) => sub.grau === riskLevel), // Filter subs based on risk level
					}))
					.filter((item) => item.subs.length > 0), // Only include items with valid subs
			}))
			.filter((category) => category.items.length > 0); // Only include categories with valid items
	};

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const data = await fetchIndicadores(token, userLogged);
				parseAndSetData(data);
			} catch (error) {
				console.error("Error fetching data:", error);
			} finally {
				setLoading(false);
			}
		};

		if (token && userLogged) {
			fetchData();
		} else {
			console.log("Token or userLogged not found");
		}
	}, []);

	useEffect(() => {
		if (!categoriesData || categoriesData.length === 0) return; // Add this check to ensure categoriesData is available

		setFilteredCategoriesData(categoriesData);

		if (riskLevel === null) {
			setFilteredCategoriesData(categoriesData);
		} else {
			const filteredData = getFilteredData(categoriesData);
			setFilteredCategoriesData(filteredData);
		}
	}, [riskLevel]);

	const fetchIndicadores = async (token, userLogged) => {
		try {
			const url =
				"https://api3.gps.med.br/API/DadosIndicadores/resultados-indicadores";
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};

			const body = {
				idPessoaFisica: userLogged,
				indicador: null,
				risco: null,
				dimensao: null,
				dataInicio: null,
				dataFim: null,
				pesquisa: null,
			};

			const response = await axios.post(url, body, config);
			return response.data;
		} catch (error) {
			console.error("Error fetching indicadores:", error);
			throw error;
		}
	};

	// Parsing function to attribute the received API array into our const array
	const parseAndSetData = (data) => {
		const parsedData = [];

		if (data && data.length > 0) {
			data.forEach((item) => {
				let parsedItem = {
					category: item.tipo,
					logo: item.logo,
					id: item.id,
					items: [],
				};

				try {
					if (item.indicadores) {
						const parsedIndicadores = JSON.parse(item.indicadores);
						parsedItem.items = parsedIndicadores.map((sub) => ({
							nome: sub.nome,
							subs: sub.Subs.map((subItem) => ({
								nome: subItem.Nome,
								grau: subItem.Grau,
								valor: subItem.valor ?? null,
								unidade: subItem.unidade ?? null,
								id: subItem.id ?? null,
								// Add more fields as needed
							})),
						}));
					}
				} catch (error) {
					console.error("Error parsing indicadores:", error);
				}

				parsedData.push(parsedItem);
			});
		}

		setCategoriesData(parsedData);
		setFilteredCategoriesData(parsedData);
	};

	const renderLogo = (logoUrl) => {
		let additionalStyle = {};
		if (logoUrl.includes("40c6eaad-8815-4cbc-9caf-78f081f03674")) {
			return (
				<MaterialCommunityIcons
					style={styles.iconContainer}
					name="head-lightbulb-outline"
					size={45}
					color="orange"
				/>
			);
		} else if (logoUrl.includes("7ed63315-ff7b-4658-b488-7655487e2845")) {
			additionalStyle = { left: 41 };
			return (
				<FontAwesome5
					style={[styles.iconContainer, additionalStyle]}
					name="running"
					size={45}
					color="orange"
				/>
			);
		} else if (logoUrl.includes("20118275-8791-469e-b9f5-3210f990dd01")) {
			additionalStyle = { left: 37.5 };
			return (
				<Ionicons
					style={[styles.iconContainer, additionalStyle]}
					name="body"
					size={45}
					color="orange"
				/>
			);
		} else {
			return null; // Handle other cases if necessary
		}
	};

	const showPopup = async (subItem, grau) => {
		try {
			const url = `https://api3.gps.med.br/API/Recomendacoes/${userLogged}/modulo/${subItem.id}`;
			const headers = {
				Authorization: `Bearer ${token}`,
			};
			const response = await axios.get(url, { headers });
			setPopupData(response.data);
			setPopupGrau(grau);
			setPopupVisible(true);
		} catch (error) {
			console.error("Error fetching popup data:", error);
		}
	};

	const hidePopup = () => {
		setPopupVisible(false);
	};

	if (loading) {
		return (
			<View style={[styles.container, styles.loadingContainer]}>
				<ActivityIndicator size="large" color="#FFA500" />
			</View>
		);
	}

	return (
		<View>
			<View contentContainerStyle={styles.container}>
				<View style={{ paddingHorizontal: 15, paddingVertical: 20 }}>
					<Picker
						options={riskOptions}
						selectedOption={selectedRisk}
						onSelect={handleRiskSelect}
					/>
				</View>

				{filteredCategoriesData.map((category, index) => (
					<View key={index} style={styles.categoryContainer}>
						<Text style={styles.categoryTitle}>
							{category.category}
						</Text>
						<View>
							<Rings
								dimen={category.category}
								isPds={true}
								pdsData={[category.items]}
							/>
							{renderLogo(category.logo)}
						</View>
						{category.items.length > 0 &&
							category.items.map((item, idx) => (
								<View
									key={idx}
									style={styles.subCategoryContainer}
								>
									<Text style={styles.subCategoryTitle}>
										{item.nome}
									</Text>
									{item.subs.length > 0 &&
										item.subs.map((subItem, subIdx) => (
											<View key={subIdx}>
												<TouchableOpacity
													key={`touchable-${subIdx}`}
													onPress={() =>
														showPopup(
															subItem,
															subItem.grau
														)
													}
												>
													<View
														key={subIdx}
														style={styles.subItem}
													>
														<View
															style={{
																flexDirection:
																	"row",
															}}
														>
															{/* Here is the compass(green, yellow, red) logic according to the "grau" */}
															{subItem.grau ==
															"1" ? (
																<Compass
																	color={
																		"#4CAF50"
																	}
																	transf={
																		"rotate(980 2560 2560)"
																	}
																/>
															) : subItem.grau ==
															  "2" ? (
																<Compass
																	color={
																		"#FFE500"
																	}
																	transf={
																		"rotate(1215 2560 2560)"
																	}
																/>
															) : subItem.grau ==
															  "3" ? (
																<Compass
																	color={
																		"#EF4040"
																	}
																/>
															) : (
																<Text></Text>
															)}
															{/* Here ends the compass(green, yellow, red) logic according to the "grau" */}
															<Text
																style={
																	styles.subItemTitle
																}
															>
																{subItem.nome}
															</Text>
														</View>
														{/* Render additional fields here as needed */}
														{subItem.valor && (
															<Text
																style={
																	styles.subItemText
																}
															>
																{subItem.valor}
																{
																	subItem.unidade
																}
															</Text>
														)}
													</View>
												</TouchableOpacity>
											</View>
										))}
								</View>
							))}
					</View>
				))}
				<View style={{ height: 100 }}></View>
			</View>

			<Popup
				isVisible={isPopupVisible}
				data={popupData}
				onClose={hidePopup}
				grau={popupGrau}
			/>
		</View>
	);
};

export default PdS;
