import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
	},
	flatListContent: {
		padding: 20,
		flexGrow: 1,
	},
	headerContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 15,
	},
	pageTitle: {
		fontSize: 26,
		fontWeight: "bold",
		color: "orange",
		textAlign: "center",
		left: 10,
	},
	image: {
		width: "100%",
		height: 200,
		marginBottom: 10,
	},
	descriptionText: {
		fontSize: 16,
		color: "black",
		marginBottom: 20,
		textAlign: "center",
		fontWeight: "bold",
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
	addButton: {
		position: "absolute",
		top: 20,
		right: 20,
		backgroundColor: "orange",
		borderRadius: 25,
		width: 50,
		height: 50,
		alignItems: "center",
		justifyContent: "center",
		elevation: 5,
	},
	shapeTitle: {
		color: "orange",
		fontWeight: "bold",
		fontSize: 20,
		marginBottom: 10,
	},
});

export default styles;
