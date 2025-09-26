import { useEffect, useState, useContext } from "react";
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	StyleSheet,
	ScrollView,
	ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import DataContext from "../../../Context/DataContext";
import Header from "../../../Components/Header";

const PermissionScreen = () => {
	const [permissions, setPermissions] = useState([]);
	const { token } = useContext(DataContext);
	const [loading, setLoading] = useState(true);
	const navigation = useNavigation();

	useEffect(() => {
		const fetchPermissions = async () => {
			setLoading(true);
			try {
				const response1 = await axios.get(
					`https://api3.gps.med.br/API/permission/my-permissions`,
					{
						headers: { Authorization: `Bearer ${token}` },
					}
				);

				setPermissions(response1.data);
			} catch (error) {
				console.error("Failed to fetch permissions:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchPermissions();
	}, [token]);

	const handleEnterProfile = (idPessoa, idPerm) => {
		navigation.navigate("PermissionProfile", { idPessoa, idPerm });
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
			<Header />
			<ScrollView contentContainerStyle={styles.container}>
				<View style={{ flexDirection: "row", marginBottom: "8%" }}>
					<Ionicons
						name="checkmark-circle-outline"
						size={36}
						color="#FFA500"
					/>
					<Text
						style={{
							marginLeft: "1%",
							marginTop: "1%",
							fontSize: 24,
							fontWeight: "bold",
							color: "orange",
						}}
					>
						Permissões
					</Text>
				</View>

				{permissions.length === 0 ? (
					<Text
						style={{
							color: "orange",
							fontWeight: "bold",
							fontSize: 20,
						}}
					>
						Não há requisicões de permissão no momento
					</Text>
				) : (
					permissions.map((permission) => (
						<View key={permission.id} style={styles.card}>
							<Image
								source={{ uri: permission.foto }}
								style={styles.image}
							/>
							<View style={styles.infoContainer}>
								<Text style={styles.name}>
									{permission.nome}
								</Text>
								<Text style={{ padding: 5, color: "gray" }}>
									Status: {permission.statusTxt}
								</Text>
								<TouchableOpacity
									style={styles.enterButton}
									onPress={() =>
										handleEnterProfile(
											permission.idPessoa,
											permission.id
										)
									}
								>
									<Text style={styles.enterButtonText}>
										Entrar
									</Text>
								</TouchableOpacity>
							</View>
						</View>
					))
				)}
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 20,
	},
	card: {
		flexDirection: "row",
		backgroundColor: "#fff",
		borderRadius: 10,
		padding: 15,
		marginVertical: 10,
		shadowColor: "#000",
		shadowOpacity: 0.1,
		shadowRadius: 5,
		elevation: 3,
	},
	image: {
		width: 50,
		height: 50,
		borderRadius: 25,
	},
	infoContainer: {
		marginLeft: 15,
		flex: 1,
	},
	name: {
		fontSize: 16,
		fontWeight: "bold",
	},
	enterButton: {
		backgroundColor: "orange",
		paddingVertical: 8,
		paddingHorizontal: 15,
		borderRadius: 5,
		marginTop: 10,
		alignItems: "center",
	},
	enterButtonText: {
		color: "#fff",
		fontWeight: "bold",
	},
});

export default PermissionScreen;
