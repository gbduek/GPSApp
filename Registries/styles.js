import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
	},
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "white",
	},
	flatListContent: {
		padding: 20,
	},
	pageTitle: {
		fontSize: 20,
		fontWeight: "bold",
		textAlign: "center",
		maxWidth: "100%",
		flexShrink: 1,
		color: "orange",
	},
	pageSubTitle: {
		fontSize: 20,
		fontWeight: "bold",
		color: "gray",
		textDecorationLine: "underline",
	},
	image: {
		width: "100%",
		height: 200,
		marginBottom: 20,
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
	},
	shapeHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 10,
	},
	shapeTitle: {
		fontSize: 24,
		fontWeight: "bold",
		color: "orange",
	},
	newRecordButton: {
		backgroundColor: "orange",
		width: 50,
		height: 50,
		borderRadius: 25,
		justifyContent: "center",
		alignItems: "center",
	},
	description: {
		fontSize: 16,
		marginBottom: 20,
	},
	noRecordsText: {
		fontSize: 16,
		textAlign: "center",
		color: "gray",
	},
	message: {
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 10,
		textAlign: "center",
	},
});

export default styles;
