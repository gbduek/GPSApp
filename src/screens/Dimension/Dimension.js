import React, { useState, useEffect, useContext } from "react";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import {
	Ionicons,
	FontAwesome5,
	MaterialCommunityIcons,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import InitEvalIcon from "../../../assets/Icons/InitEvalIcon";
import axios from "axios";
import DataContext from "../../../Context/DataContext";
import Header from "../../../Components/Header";
import styles from "./styles";
import CustomTabBar from "../../routes/CustomTabNav/CustomTabBar";

const Dimension = ({ navigation, id }) => {
	const { percentages, loading, token, userLogged } = useContext(DataContext);
	const [data, setData] = useState();
	const [nome, setNome] = useState();

	// Map id to icon and percentage key
	const idMap = {
		"20118275-8791-469e-b9f5-3210f990dd01": {
			icon: (
				<Ionicons
					style={{ paddingRight: 5 }}
					name="body"
					size={28}
					color="orange"
				/>
			),
			percentageKey: "corpo",
		},
		"40c6eaad-8815-4cbc-9caf-78f081f03674": {
			icon: (
				<MaterialCommunityIcons
					style={{ paddingRight: 5 }}
					name="head-lightbulb-outline"
					size={28}
					color="orange"
				/>
			),
			percentageKey: "mente",
		},
		"7ed63315-ff7b-4658-b488-7655487e2845": {
			icon: (
				<FontAwesome5
					style={{ paddingRight: 10 }}
					name="running"
					size={28}
					color="orange"
				/>
			),
			percentageKey: "lifestyle",
		},
		//idMap for Avaliação Inicial
		"e75689fd-a258-a071-a439-9d5c3889b514": {
			icon: <InitEvalIcon style={{ paddingRight: 10 }} />,
			percentageKey: "initeval",
		},
	};

	const current = idMap[id] || {
		icon: (
			<Ionicons
				style={{ paddingRight: 5 }}
				name="body"
				size={28}
				color="orange"
			/>
		),
		percentageKey: "corpo",
	};

	const { icon, percentageKey } = current;

	// Cache key for AsyncStorage
	const cacheKey = `dimension_${id}`;
	const cacheExpiryKey = `${cacheKey}_expiry`; // Key for cache expiry

	const fetchData = async () => {
		try {
			// Try to fetch data from cache first
			const cachedData = await AsyncStorage.getItem(cacheKey);
			const cacheExpiry = await AsyncStorage.getItem(cacheExpiryKey);

			const isCacheValid =
				cachedData &&
				cacheExpiry &&
				Date.now() < JSON.parse(cacheExpiry);

			if (isCacheValid) {
				const parsedData = JSON.parse(cachedData);
				setData(parsedData.indicadores);
				setNome(parsedData.nome);
				return;
			}

			// Fetch fresh data if not found in cache or cache is expired
			const response = await axios.get(
				`https://api3.gps.med.br/API/DadosIndicadores/tipo-indicadores-porcetagem-preenchimento/${userLogged}/${id}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			const fetchedData = response.data;
			setData(fetchedData.indicadores);
			setNome(fetchedData.nome);

			// Save data to cache with expiration time (1 hour)
			await AsyncStorage.setItem(cacheKey, JSON.stringify(fetchedData));
			await AsyncStorage.setItem(
				cacheExpiryKey,
				JSON.stringify(Date.now() + 3600000)
			); // 1 hour
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	useEffect(() => {
		if (token && userLogged) {
			fetchData(); // Fetch data with caching.
		}
	}, [id]);

	const handleFormOpen = (item) => {
		navigation.navigate("Registry", {
			title: item.nome,
			id: item.id,
			type: nome,
		});
	};

	const SubComponent = ({ title, onPress }) => (
		<TouchableOpacity onPress={onPress}>
			<View style={styles.subComponent}>
				<Text style={styles.subComponentTitle}>{title}</Text>
				<View style={styles.iconContainer}>
					<Ionicons name="arrow-forward" size={24} color="white" />
				</View>
			</View>
		</TouchableOpacity>
	);

	return (
		<View style={{ flex: 1 }}>
			<Header />
			<View style={styles.container}>
				<View style={styles.header}>
					{icon}
					<View style={styles.titleContainer}>
						<Text style={styles.title}>{nome}</Text>
						{loading ? (
							<Text>Loading...</Text>
						) : (
							<Text style={styles.percentage}>
								{percentages[percentageKey]}%
							</Text>
						)}
					</View>
				</View>
				<Image
					source={{
						uri: `https://api3.gps.med.br/api/upload/image?vinculo=${id}`,
					}}
					style={styles.image}
				/>
				<FlatList
					scrollIndicatorInsets={{ right: 1 }}
					showsVerticalScrollIndicator={false}
					data={data}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						<SubComponent
							title={item.nome}
							onPress={() => handleFormOpen(item)}
						/>
					)}
					ItemSeparatorComponent={() => (
						<View style={styles.separator} />
					)}
					ListFooterComponent={() => <View style={styles.footer} />}
				/>
				<View
					style={{
						position: "absolute",
						bottom: 0,
						left: 0,
						right: 0,
					}}
				>
					<CustomTabBar />
				</View>
			</View>
		</View>
	);
};

export default Dimension;
