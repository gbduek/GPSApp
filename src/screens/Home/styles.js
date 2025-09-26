import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
	},
	content: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 0,
	},
	scrollViewContent: {
		alignItems: "center",
		width: "100%",
	},
	heading: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 10,
		marginTop: 30,
		textAlign: "center",
		color: "orange",
		fontFamily: "Gontserrat-700",
		paddingHorizontal: 15,
	},
	paragraph: {
		textAlign: "center",
		color: "#504b4b",
		fontWeight: "bold",
		fontSize: 18,
		letterSpacing: 1,
		paddingHorizontal: 15,
	},
	greetingText: {
		position: "absolute",
		top: 5,
		left: 0,
		fontWeight: "bold",
		color: "orange",
		fontSize: 22,
		paddingHorizontal: 15,
		marginTop: 10,
	},
	ringsContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		top: 50,
		marginBottom: 20,
	},
	paragraphContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 70,
		paddingHorizontal: 15,
		width: "100%",
	},
	iconBackground: {
		backgroundColor: "orange",
		borderRadius: 24,
		padding: 12,
	},
	paragraphTextContainer: {
		marginLeft: 10,
		flex: 1,
	},
	paragraphTitle: {
		fontSize: 22,
		fontWeight: "bold",
		color: "#504b4b",
		marginBottom: 5,
	},
	paragraphDescription: {
		fontSize: 18,
		color: "#7b7b7b",
		fontFamily: "Arial",
	},
	ribbonContainer: {
		marginTop: 10,
		backgroundColor: "#ffcccc",
		padding: 10,
		borderRadius: 5,
		alignItems: "center",
		width: "100%",
	},
	ribbonContainerOk: {
		marginTop: 10,
		backgroundColor: "green",
		padding: 10,
		borderRadius: 5,
		alignItems: "center",
		width: "100%",
	},
	ribbonText: {
		color: "red",
		fontSize: 16,
		fontWeight: "bold",
		textAlign: "center",
	},
	iconContainer: {
		position: "absolute",
		alignItems: "center",
		justifyContent: "center",
		width: 50,
		height: 50,
		borderRadius: 25,
		backgroundColor: "transparent",
		top: 35,
		left: 36,
	},
	loadingContainer: {
		justifyContent: "center",
		alignItems: "center",
	},
});

export default styles;
