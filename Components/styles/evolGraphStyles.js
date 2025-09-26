import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		paddingTop: 20,
	},
	graphContainer: {
		flex: 1,
		flexDirection: "row",
		paddingLeft: 10,
	},
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	noDataContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	noDataText: {
		fontSize: 16,
		color: "#666",
	},
	yAxisContainer: {
		width: 40,
		marginRight: 5,
	},
});

export default styles;
