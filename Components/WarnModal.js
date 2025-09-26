import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import * as Animatable from "react-native-animatable";
import { FontAwesome } from "@expo/vector-icons";

const WarnModal = ({ isVisible, data, onClose, type }) => {
	if (!isVisible || !data) return null;

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

					{/* Conditionally render the icon based on the type */}
					{type === "success" ? (
						<Animatable.View animation="bounceIn" duration={800}>
							<FontAwesome
								name="check-circle"
								size={60}
								color="green"
								style={styles.icon}
							/>
						</Animatable.View>
					) : type === "error" ? (
						<Animatable.View animation="bounceIn" duration={800}>
							<FontAwesome
								name="exclamation-circle"
								size={60}
								color="red"
								style={styles.icon}
							/>
						</Animatable.View>
					) : null}

					<Text style={styles.popupTitle}>Atenção</Text>
					<Text style={styles.popupMessage}>{data}</Text>

					<TouchableOpacity
						style={styles.popupButton}
						onPress={onClose}
					>
						<Text style={styles.popupButtonText}>Fechar</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	popupContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	popupContent: {
		width: "85%",
		backgroundColor: "white",
		borderRadius: 15,
		padding: 20,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	closeButton: {
		alignSelf: "flex-end",
	},
	icon: {
		marginBottom: 15,
	},
	popupTitle: {
		fontSize: 20,
		fontWeight: "bold",
		color: "orange",
		marginBottom: 10,
	},
	popupMessage: {
		fontSize: 16,
		textAlign: "center",
		marginBottom: 20,
		color: "#333",
	},
	popupButton: {
		backgroundColor: "orange",
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 5,
	},
	popupButtonText: {
		color: "white",
		fontWeight: "bold",
		fontSize: 16,
	},
});

export default WarnModal;
