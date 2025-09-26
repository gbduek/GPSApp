import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
		padding: 20,
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 15,
	},
	titleContainer: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	title: {
		fontWeight: "bold",
		fontSize: 24,
		color: "orange",
	},
	percentage: {
		fontSize: 20,
		color: "orange",
		fontWeight: "bold",
	},
	image: {
		width: "100%",
		height: 250,
		marginBottom: 15,
	},
	subComponent: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 10,
		paddingHorizontal: 10,
	},
	subComponentTitle: {
		fontWeight: "bold",
		fontSize: 18,
	},
	separator: {
		height: 1,
		backgroundColor: "gray",
		marginVertical: 8,
	},
	footer: {
		flex: 1,
		height: 70,
	},
	iconContainer: {
		backgroundColor: "orange",
		width: 40,
		height: 40,
		borderRadius: 20,
		justifyContent: "center",
		alignItems: "center",
	},
	loadingContainer: {
		justifyContent: "center",
		alignItems: "center",
	},
});

export default styles;
