import React from "react";
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	Image,
	Linking,
	Modal,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Compass from "../../assets/Icons/Compass";

const Popup = ({ isVisible, data, onClose, grau }) => {
	if (!isVisible || !data) return null;

	const handleLinkPress = (url) => {
		Linking.openURL(url);
	};

	return (
		<Modal
			visible={isVisible}
			transparent={true}
			animationType="fade"
			onRequestClose={onClose}
		>
			<View style={styles.popupContainer}>
				<View style={styles.popupContent}>
					<TouchableOpacity
						style={styles.closeButton}
						onPress={onClose}
					>
						<FontAwesome name="times" size={24} color="orange" />
					</TouchableOpacity>
					{data.foto && (
						<Image
							source={{ uri: data.foto }}
							style={styles.popupImage}
						/>
					)}
					<View style={{ flexDirection: "row" }}>
						<Text
							style={[
								styles.popupTitle,
								{ marginRight: 8, flexShrink: 1 },
							]}
						>
							{data.nome}
						</Text>
						{grau == "1" ? (
							<Compass
								color={"#4CAF50"}
								transf={"rotate(980 2560 2560)"}
							/>
						) : grau == "2" ? (
							<Compass
								color={"#FFE500"}
								transf={"rotate(1215 2560 2560)"}
							/>
						) : grau == "3" ? (
							<Compass color={"#EF4040"} />
						) : (
							<Text></Text>
						)}
					</View>
					<Text style={styles.popupDescription}>
						{data.recomendacao}
					</Text>
					<TouchableOpacity
						style={styles.popupButton}
						onPress={() => handleLinkPress(data.link)}
					>
						<Text style={styles.popupButtonText}>Saiba Mais</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	popupContainer: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		zIndex: 1000,
		width: "100%",
		height: "100%",
	},
	popupContent: {
		width: "90%",
		maxHeight: "90%",
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
		marginBottom: 10,
	},
	popupDescription: {
		fontSize: 16,
		marginBottom: 10,
	},
	popupImage: {
		width: "100%",
		height: 200,
		marginBottom: 20,
		marginTop: 20,
		resizeMode: "stretch",
	},
	popupButton: {
		backgroundColor: "orange",
		padding: 10,
		borderRadius: 5,
		alignItems: "center",
	},
	popupButtonText: {
		color: "white",
		fontWeight: "bold",
	},
});

export default Popup;
