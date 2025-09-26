import React, { useState, useContext, useCallback } from "react";
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	FlatList,
	ActivityIndicator,
	TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import GraphicR from "../Components/GraphicR";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import DataContext from "../Context/DataContext";
import GraphEvolutivo from "../Components/GraphEvolutivo";
import styles from "./styles";

const Registry = ({ route, navigation }) => {
	const { type, title, id } = route.params;
	const [description, setDescription] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [loading, setLoading] = useState(true);
	const { token, userLogged } = useContext(DataContext);
	const [refreshing, setRefreshing] = useState(false);
	const [exemplos, setExemplos] = useState([]);
	const [graphResp, setGraphResp] = useState();

	const fetchData = async () => {
		if (!token || !userLogged) {
			console.log("Token or userLogged not found");
			return;
		}
		try {
			const response = await axios.get(
				`https://api3.gps.med.br/API/DadosIndicadores/${userLogged}/${id}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (type == "Corpo") {
				const medidores = response.data.MedidoresForm || [];
				const exemplos = medidores.flatMap((m) =>
					m.Medidores.map((med) => med.Exemplo)
				);

				setExemplos(exemplos);
			}

			setDescription(response.data.Descricao);
			setImageUrl(response.data.Imagem);

			const resp2 = await axios.get(
				`https://api3.gps.med.br/API/DadosIndicadores/page-data/${userLogged}/${id}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			setGraphResp(resp2);

			setLoading(false);
		} catch (error) {
			console.error("Error fetching data:", error);
			setLoading(false);
		}
	};

	useFocusEffect(
		useCallback(() => {
			setLoading(true);
			fetchData(); // Fetch data when the screen comes into focus
		}, [id, userLogged])
	);

	const handleNewRecord = () => {
		// Navigate to the Questionary screen with dynamic questions and options
		if (type === "Corpo") {
			navigation.navigate("Questionary", {
				type,
				title,
				id,
				examples: exemplos,
			});
		} else {
			navigation.navigate("Questionary", { type, title, id });
		}
	};

	const renderItem = ({ item }) => {
		switch (item.type) {
			case "header":
				return (
					<View
						style={{
							paddingHorizontal: 16,
							marginBottom: 10,
							alignItems: "center",
							flexDirection: "row",
							justifyContent: "center",
						}}
					>
						<Text
							style={styles.pageTitle}
							numberOfLines={1}
							ellipsizeMode="tail"
						>
							<TouchableWithoutFeedback
								onPress={() => navigation.goBack()}
							>
								<Text
									style={[
										styles.pageSubTitle,
										{ color: "gray" },
									]}
								>
									{type ? `${type}` : "Título não encontrado"}
								</Text>
							</TouchableWithoutFeedback>
							{" > "}
							{title ? `${title}` : "Título não encontrado"}
						</Text>
					</View>
				);
			case "image":
				return (
					<Image
						source={{
							uri: imageUrl || "https://via.placeholder.com/300",
						}}
						style={styles.image}
						resizeMode="stretch"
					/>
				);
			case "geometricShape":
				return (
					<View>
						<View style={styles.geometricShape}>
							<View style={styles.shapeHeader}>
								<View style={{ flex: 1, paddingRight: 10 }}>
									<Text style={styles.shapeTitle}>
										{title}
									</Text>
								</View>

								{id !==
									"5bdefa56-4559-4d9a-b550-c29599fcb4aa" && (
									<TouchableOpacity
										style={styles.newRecordButton}
										onPress={handleNewRecord}
									>
										<Ionicons
											name="add"
											size={30}
											color="white"
										/>
									</TouchableOpacity>
								)}
							</View>

							<Text style={styles.description}>
								{description}
							</Text>
							<Text style={styles.message}>
								Veja abaixo o gráfico do seu último registro!
							</Text>
							<GraphicR
								id={id}
								refreshing={refreshing}
								response={graphResp}
							/>
						</View>
						<View
							style={[styles.geometricShape, { marginTop: 20 }]}
						>
							<Text style={styles.shapeTitle}>
								Gráfico Evolutivo
							</Text>
							<GraphEvolutivo
								id={id}
								refreshing={refreshing}
								response={graphResp}
							/>
						</View>
					</View>
				);
			default:
				return null;
		}
	};

	const data = [
		{ id: "header", type: "header" },
		{ id: "image", type: "image" },
		{ id: "geometricShape", type: "geometricShape" },
	];

	if (loading) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size="large" color="orange" />
			</View>
		);
	}

	return (
		<View style={{ flex: 1 }}>
			<View style={styles.container}>
				<FlatList
					data={data}
					keyExtractor={(item) => item.id}
					renderItem={renderItem}
					contentContainerStyle={styles.flatListContent}
					ListFooterComponent={<View style={{ height: 50 }} />}
				/>
			</View>
		</View>
	);
};

export default Registry;
