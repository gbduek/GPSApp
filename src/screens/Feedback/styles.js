import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		padding: 20,
		backgroundColor: "#fff",
	},
	title: {
		fontSize: 28,
		textAlign: "center",
		marginBottom: 20,
		fontWeight: "bold",
		color: "orange", // Orange color for title
	},
	input: {
		height: 50,
		borderColor: "orange", // Orange border for inputs
		borderWidth: 1,
		borderRadius: 10,
		marginBottom: 15,
		paddingLeft: 15,
		fontSize: 16,
		color: "#333",
	},
	feedbackInput: {
		height: 100,
		textAlignVertical: "top", // For multiline text input
	},
	imageButton: {
		flexDirection: "row",
		backgroundColor: "#FF7F00", // Orange background for button
		padding: 10,
		borderRadius: 8,
		marginBottom: 15,
		alignItems: "center",
		justifyContent: "center",
	},
	imageButtonText: {
		color: "#fff",
		fontSize: 16,
		marginLeft: 10,
	},
	imagePreview: {
		width: 150,
		height: 150,
		marginBottom: 20,
		borderRadius: 8,
		resizeMode: "cover",
	},
	submitButton: {
		backgroundColor: "orange",
		padding: 15,
		borderRadius: 10,
		alignItems: "center",
	},
	submitButtonText: {
		color: "#fff",
		fontSize: 18,
		fontWeight: "bold",
	},
	note: {
		marginTop: 20,
		textAlign: "center",
		fontStyle: "italic",
		color: "#555",
	},
	starContainer: {
		flexDirection: "row",
		justifyContent: "center",
		marginBottom: 15,
	},
	ball: {
		width: 30,
		height: 50,
		borderRadius: 20,
		marginHorizontal: 3,
		borderWidth: 1,
		borderColor: "#aaa",
	},
});

export default styles;
