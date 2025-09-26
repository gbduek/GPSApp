import React, { useState, useEffect, useContext, useCallback } from "react";
import {
	View,
	Text,
	StyleSheet,
	ActivityIndicator,
	ScrollView,
	TouchableOpacity,
	Modal,
	TouchableWithoutFeedback,
	Platform,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import DataContext from "../Context/DataContext";
import Tooltip from "./UIComp/Tooltip";

const GraphicR = ({ id, refreshing, response }) => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [tooltipIndex, setTooltipIndex] = useState(null); // State to manage which tooltip is visible
	const { userLogged } = useContext(DataContext);
	const [modalVisible, setModalVisible] = useState(false); // State to manage modal visibility
	let [addAndroid, setAddAndroid] = useState(0);

	const fetchData = async () => {
		try {
			let apiData = response.data.GraficoEvolutivo.map((item) => ({
				idMedicao: response.data.Historico[0]?.IdMedicao,
				nome: item.Nome,
				date: new Date(item.UltimaMedicaoData).toLocaleDateString(
					"pt-BR",
					{
						year: "2-digit",
						month: "2-digit",
						day: "2-digit",
					}
				),
				value: item.UltimaMedicao,
				color: item.CorExibicao,
			}));

			// Exception: Only show IMC if IdMedicao matches the specified ID
			if (
				response.data.Historico[0]?.IdMedicao ===
				"43999272-9447-486e-980e-74f94c99a85b"
			) {
				apiData = apiData.filter((item) => item.nome === "IMC");
			}

			setData(apiData);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	useFocusEffect(
		useCallback(() => {
			fetchData(); // Fetch data when the screen comes into focus
		}, [id, userLogged])
	);

	useEffect(() => {
		setLoading(false);

		if (Platform.OS === "android") {
			setAddAndroid(35);
		} else if (Platform.OS === "ios") {
			setAddAndroid(0);
		}

		if (refreshing) {
			fetchData();
		}
	}, [refreshing]);

	const handleBarPress = (index) => {
		setTooltipIndex(index);
		setModalVisible(true); // Show the modal when the tooltip is visible
	};

	const handleCloseModal = () => {
		setModalVisible(false);
		setTooltipIndex(null); // Close the tooltip
	};

	if (loading) {
		return (
			<View style={styles.loaderContainer}>
				<ActivityIndicator size="large" color="#FFA500" />
			</View>
		);
	}

	return (
		<View style={styles.container}>
			{/* These are the vertical numbers on the left of the graphic */}
			<View
				style={[
					styles.yAxis,
					{ height: 200, marginBottom: 0 + addAndroid },
				]}
			>
				{[100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 0].map((value) => (
					<Text key={value} style={styles.yAxisText}>
						{value}
					</Text>
				))}
			</View>
			{/* If there are more than 7 bars, render within a ScrollView */}
			{data.length > 7 ? (
				<ScrollView
					horizontal
					contentContainerStyle={styles.scrollViewContent}
					showsHorizontalScrollIndicator={false}
				>
					<View style={[styles.graph, { height: 200 + addAndroid }]}>
						{data.map((dataItem, index) => (
							<View
								key={index}
								style={[
									styles.barContainer,
									{ marginRight: 5, marginBottom: 20 },
								]}
							>
								<TouchableOpacity
									onPress={() => handleBarPress(index)}
									style={[
										styles.bar,
										{
											height: `${Math.min(
												dataItem.value,
												100
											)}%`,
											backgroundColor: dataItem.color,
										},
									]}
								/>
								<Text style={styles.dateText}>
									{dataItem.date}
								</Text>
							</View>
						))}
					</View>
				</ScrollView>
			) : (
				<View style={[styles.graph, { height: 200 }]}>
					{data.map((dataItem, index) => (
						<View key={index} style={styles.barContainer}>
							<TouchableOpacity
								onPress={() => handleBarPress(index)}
								style={[
									styles.bar,
									{
										height: `${Math.min(
											dataItem.value,
											100
										)}%`,
										backgroundColor: dataItem.color,
									},
								]}
							/>
							<Text style={styles.dateText}>{dataItem.date}</Text>
						</View>
					))}
				</View>
			)}

			{/* Modal for displaying tooltips */}
			<Modal
				visible={modalVisible}
				transparent
				animationType="fade"
				onRequestClose={handleCloseModal}
			>
				<TouchableWithoutFeedback onPress={handleCloseModal}>
					<View style={styles.modalContainer}>
						<View style={styles.tooltipContainer}>
							<Tooltip
								isVisible={tooltipIndex !== null}
								content={`${data[tooltipIndex]?.nome}: ${data[tooltipIndex]?.value}`}
								position="top"
							/>
						</View>
					</View>
				</TouchableWithoutFeedback>
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
	loaderContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 20,
	},
	container: {
		flexDirection: "row",
		alignItems: "flex-end",
		marginTop: 20,
		marginBottom: 20,
	},
	yAxis: {
		justifyContent: "space-between",
	},
	yAxisText: {
		fontSize: 14,
		textAlign: "right",
	},
	graph: {
		flexDirection: "row",
		alignItems: "flex-end",
		width: "100%",
		top: 20,
	},
	scrollViewContent: {
		alignItems: "flex-end",
	},
	barContainer: {
		flex: 1,
		alignItems: "center",
		position: "relative", // Ensure tooltips are positioned relative to this container
	},
	bar: {
		width: 20,
		borderRadius: 10,
	},
	dateText: {
		marginTop: 5,
		fontSize: 12,
	},
	modalContainer: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0)",
		justifyContent: "center",
		alignItems: "center",
	},
	tooltipContainer: {
		padding: 20,
		borderRadius: 8,
		maxWidth: 200,
		alignItems: "center",
	},
});

export default GraphicR;
