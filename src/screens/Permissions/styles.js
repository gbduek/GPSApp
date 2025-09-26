import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFF",
		paddingHorizontal: 20,
		paddingTop: 40,
	},
	profileContainer: {
		alignItems: "center",
		marginBottom: 20,
	},
	profileImage: {
		width: 120,
		height: 120,
		borderRadius: 60,
		borderWidth: 3,
		borderColor: "#FFA500",
	},
	infoContainer: {
		marginBottom: 25,
	},
	inputContainer: {
		marginBottom: 15,
	},
	inputTitle: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#FFA500",
		marginBottom: 5,
	},
	input: {
		borderWidth: 1,
		borderColor: "#DDD",
		borderRadius: 8,
		padding: 10,
		fontSize: 16,
		backgroundColor: "#F5F5F5",
		color: "#333",
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "center",
		marginTop: 30,
	},
	button: {
		width: "48%",
		borderRadius: 30,
		paddingVertical: 12,
		alignItems: "center",
		backgroundColor: "#FFF",
		borderWidth: 2,
		borderColor: "#FFA500",
	},
	buttonText: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#FFA500",
	},
	permissionsContainer: {
		marginTop: 30,
	},
	permissionHeader: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 20,
	},
	permissionHeaderTitle: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#FFA500",
		marginLeft: 10,
	},
	permissionItem: {
		backgroundColor: "#FFF3E0",
		padding: 15,
		borderRadius: 10,
		marginBottom: 10,
	},
	permissionTitle: {
		fontSize: 16,
		fontWeight: "bold",
		color: "#FFA500",
	},
	permissionDescription: {
		fontSize: 14,
		color: "#333",
		marginTop: 5,
	},
	geometricShape: {
		backgroundColor: "white",
		borderRadius: 15,
		padding: 20,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		marginBottom: 20, // spacing between shapes
	},
});

export default styles;
