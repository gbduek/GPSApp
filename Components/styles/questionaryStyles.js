import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
		paddingTop: 20,
	},
	pageTitle: {
		fontSize: 26,
		fontWeight: "bold",
		marginBottom: 10,
		color: "orange",
		textAlign: "center",
	},
	progressBarContainer: {
		height: 10,
		marginHorizontal: 20,
		marginBottom: 20,
	},
	progressBarBackground: {
		height: 10,
		backgroundColor: "#ddd",
		borderRadius: 5,
		overflow: "hidden",
	},
	progressBarFill: {
		height: 10,
		backgroundColor: "orange",
		borderRadius: 5,
	},
	questionContainer: {
		backgroundColor: "white",
		padding: 20,
		borderRadius: 10,
		marginHorizontal: 20,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 4,
		elevation: 5,
	},
	question: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 20,
	},
	optionCircle: {
		padding: 12,
		borderRadius: 12,
		borderWidth: 2,
		borderColor: "orange",
		marginBottom: 10,
		alignItems: "center",
		justifyContent: "center",
	},
	selectedOptionCircle: {
		backgroundColor: "orange",
	},
	optionText: {
		fontSize: 16,
	},
	selectedOptionText: {
		color: "white",
		fontWeight: "bold",
	},
	textInput: {
		borderWidth: 1,
		borderColor: "orange",
		borderRadius: 10,
		padding: 10,
		fontSize: 16,
		marginBottom: 20,
	},
	navButtonText: {
		color: "white",
		fontSize: 16,
		fontWeight: "bold",
	},
	send_cancelButton: {
		borderRadius: 5,
		padding: 10,
		flex: 1,
		alignItems: "center",
	},
});

export default styles;
