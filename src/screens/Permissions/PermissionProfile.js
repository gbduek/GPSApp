import React, { useEffect, useState, useContext } from "react";
import {
	View,
	Text,
	ScrollView,
	Image,
	TouchableOpacity,
	Alert,
	TextInput,
	Switch,
} from "react-native";
import axios from "axios";
import DataContext from "../../../Context/DataContext";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import styles from "./styles";
import postRequest from "./postRequest";
import { data, permissions } from "./constants";

const PermissionProfile = ({ route }) => {
	const { idPessoa, idPerm } = route.params;
	const { token } = useContext(DataContext);
	const [profile, setProfile] = useState(null);
	const [switches, setSwitches] = useState([
		{ label: "Mente", visualize: false, register: false, tipoPermissao: 1 },
		{
			label: "Estilo de vida",
			visualize: false,
			register: false,
			tipoPermissao: 1,
		},
		{ label: "Corpo", visualize: false, register: false, tipoPermissao: 1 },
		{
			label: "Bordo",
			visualize: false,
			register: false,
			tipoPermissao: 2,
		},
		{
			label: "Emocional",
			visualize: false,
			register: false,
			tipoPermissao: 2,
		},
		{
			label: "Movimento",
			visualize: false,
			register: false,
			tipoPermissao: 2,
		},
		{
			label: "Sintomas",
			visualize: false,
			register: false,
			tipoPermissao: 2,
		},
	]);

	// Function to handle switching 'visualize' or 'register'
	// tipoPermissao = is it diary or dimension?
	const handleSwitchChange = (index, type, tipoPermissao) => {
		if (type === "all_visu") {
			// Toggle 'visualize' for all switches
			setSwitches((prevSwitches) =>
				prevSwitches.map((item) => ({
					...item,
					visualize: !item.visualize,
				}))
			);
			setSwitches((prevSwitches) =>
				prevSwitches.map((item) => ({ ...item, register: false }))
			);
		} else if (type === "all_regis") {
			// Toggle 'register' for all switches
			setSwitches((prevSwitches) =>
				prevSwitches.map((item) => ({
					...item,
					register: !item.register,
				}))
			);
			setSwitches((prevSwitches) =>
				prevSwitches.map((item) => ({ ...item, visualize: false }))
			);
		} else {
			setSwitches((prevSwitches) =>
				prevSwitches.map((item, idx) =>
					idx === index ? { ...item, [type]: !item[type] } : item
				)
			);
		}
	};

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const response = await axios.get(
					`https://api3.gps.med.br/API/permission/${idPessoa}`,
					{
						headers: { Authorization: `Bearer ${token}` },
					}
				);

				setProfile(response.data);
			} catch (error) {
				console.error("Failed to fetch profile:", error);
				Alert.alert("Error", "Failed to fetch profile information.");
			}
		};

		fetchProfile();
	}, [idPessoa]);

	const sendData = async () => {
		try {
			const response = await axios.patch(
				`https://api3.gps.med.br/API/permission/${idPerm}`,
				postRequest(switches),
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			console.log("Response data:", response.data);
			Alert.alert("Sucesso", "Permissões atualizadas com sucesso!");
		} catch (error) {
			console.error("Failed to fetch profile:", error);
			Alert.alert("Error", "Failed to fetch profile information.");
		}
	};

	if (!profile) {
		return <Text>Loading...</Text>;
	}

	const renderItem = (item) => (
		<View style={styles.inputContainer} key={item.title}>
			<Text style={styles.inputTitle}>{item.title}</Text>
			<TextInput
				style={styles.input}
				placeholder={item.placeholder}
				placeholderTextColor="#999"
				value={item.value}
				editable={false} // If you don't want the input to be editable
			/>
		</View>
	);

	// Render each permission item
	const renderPermissionItem = (permission, index) => (
		<View key={permission.id} style={styles.permissionItem}>
			<Text style={styles.permissionTitle}>{permission.nome}</Text>
			<View style={{ flexDirection: "row" }}>
				{/* <Text>{index}</Text> */}
				<Switch
					value={switches[index].visualize}
					onValueChange={() => handleSwitchChange(index, "visualize")}
					trackColor={{ false: "#BEBEBE", true: "#FFA500" }}
					thumbColor="white"
					style={{ marginTop: 10 }}
				/>
				<Switch
					value={switches[index].register}
					onValueChange={() => handleSwitchChange(index, "register")}
					trackColor={{ false: "#BEBEBE", true: "#FFA500" }}
					thumbColor="white"
					style={{ marginTop: 10, marginLeft: 150 }}
				/>
			</View>
		</View>
	);

	return (
		<View style={{ backgroundColor: "white", flex: 1 }}>
			<ScrollView style={styles.container}>
				<View style={styles.geometricShape}>
					<View style={styles.profileContainer}>
						<Image
							style={styles.profileImage}
							source={{
								uri: `https://api3.gps.med.br/API/upload/image?vinculo=${idPessoa}&tipo=pessoa`,
							}}
						/>
					</View>
					{data(profile).map(renderItem)}
				</View>

				{/* New "Permissão Pendente" Section */}
				<View style={styles.geometricShape}>
					<View style={styles.permissionHeader}>
						<MaterialIcons
							name="check-circle-outline"
							size={24}
							color="#FFA500"
						/>
						<Text style={styles.permissionHeaderTitle}>
							Permissão Pendente
						</Text>
					</View>
					<View>
						<Text
							style={{
								fontSize: 22,
								fontWeight: "bold",
								color: "#FFA500",
							}}
						>
							Dimensão
						</Text>
						<View
							style={{
								flexDirection: "row",
								marginTop: 15,
								marginBottom: 15,
							}}
						>
							<TouchableOpacity
								style={[
									styles.button,
									{ flexDirection: "row" },
								]}
								onPress={() =>
									handleSwitchChange(0, "all_visu")
								}
							>
								<Entypo
									name="check"
									style={{ marginLeft: 10 }}
									size={24}
									color="#FFA500"
								/>
								<Text style={styles.buttonText}>
									Visualizar
								</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={[
									styles.button,
									{ marginLeft: 10, flexDirection: "row" },
								]}
								onPress={() =>
									handleSwitchChange(0, "all_regis")
								}
							>
								<Entypo
									name="check"
									style={{ marginLeft: 10 }}
									size={24}
									color="#FFA500"
								/>
								<Text style={styles.buttonText}>Registrar</Text>
							</TouchableOpacity>
						</View>

						{
							permissions
								.slice(0, 3)
								.map((permission, index) =>
									renderPermissionItem(permission, index)
								) //
						}

						<View
							style={{
								height: 2,
								backgroundColor: "black",
								marginVertical: 10,
							}}
						></View>

						<Text>Diários</Text>

						{
							permissions
								.slice(3)
								.map((permission, index) =>
									renderPermissionItem(permission, index + 3)
								) //
						}

						<View style={{ flexDirection: "row", marginTop: 20 }}>
							<TouchableOpacity
								style={[
									styles.button,
									{
										borderColor: "#f44336",
										backgroundColor: "#f44336",
										marginLeft: 2,
									},
								]}
							>
								<Text
									style={[
										styles.buttonText,
										{ color: "white" },
									]}
								>
									Reprovar
								</Text>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={sendData}
								style={[
									styles.button,
									{
										borderColor: "#2dce89",
										backgroundColor: "#2dce89",
										marginLeft: 10,
									},
								]}
							>
								<Text
									style={[
										styles.buttonText,
										{ color: "white" },
									]}
								>
									Aprovar
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>

				<View style={{ height: 150 }} />
			</ScrollView>
		</View>
	);
};

export default PermissionProfile;
