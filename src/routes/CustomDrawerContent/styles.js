import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	header: {
		height: 150,
		backgroundColor: "orange",
		justifyContent: "center",
		alignItems: "center",
		top: 30,
	},
	headerImage: {
		width: 240,
		height: 90,
		resizeMode: "stretch",
	},
	drawerItems: {
		flex: 1,
		backgroundColor: "orange",
		marginTop: 20,
	},
	drawerLabel: {
		fontSize: 20,
		fontWeight: "bold",
	},
	drawerItem: {
		marginTop: 10,
	},
	subMenu: {
		paddingLeft: 30,
		backgroundColor: "#ffcc80",
	},
	subMenuLabel: {
		fontSize: 18,
	},
});

export default styles;
