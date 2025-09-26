import { StyleSheet } from "react-native";

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
		paddingHorizontal: 16,
	},
	headerContainer: {
		marginBottom: 24,
		marginTop: 16,
	},
	pageTitle: {
		fontSize: 28,
		fontWeight: "bold",
		color: "orange",
		marginBottom: 8,
		textAlign: "center",
	},
	pageSubtitle: {
		fontSize: 16,
		color: "#718096",
		lineHeight: 22,
	},
	integrationCard: {
		backgroundColor: "white",
		borderRadius: 12,
		padding: 20,
		marginBottom: 20,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.1,
		shadowRadius: 3.84,
		elevation: 5,
	},
	cardHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 16,
	},
	serviceInfo: {
		flexDirection: "row",
		alignItems: "center",
	},
	titleText: {
		fontSize: 20,
		fontWeight: "600",
		color: "#2d3748",
	},
	statusBadge: {
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderRadius: 16,
	},
	connectedBadge: {
		backgroundColor: "#c6f6d5",
	},
	disconnectedBadge: {
		backgroundColor: "#fed7d7",
	},
	statusText: {
		fontSize: 12,
		fontWeight: "600",
	},
	descriptionContainer: {
		marginBottom: 16,
	},
	descriptionText: {
		fontSize: 14,
		color: "#4a5568",
		lineHeight: 20,
	},
	benefitsContainer: {
		marginBottom: 20,
	},
	benefitsTitle: {
		fontSize: 16,
		fontWeight: "600",
		color: "#2d3748",
		marginBottom: 8,
	},
	benefitItem: {
		flexDirection: "row",
		alignItems: "flex-start",
		marginBottom: 4,
	},
	bulletPoint: {
		marginRight: 8,
		color: "orange",
		fontSize: 16,
	},
	benefitText: {
		fontSize: 14,
		color: "#4a5568",
		flex: 1,
	},
	actionsContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	button: {
		paddingHorizontal: 20,
		paddingVertical: 12,
		borderRadius: 8,
		minWidth: 120,
		alignItems: "center",
	},
	connectButton: {
		backgroundColor: "orange",
	},
	disconnectButton: {
		backgroundColor: "#e53e3e",
	},
	buttonText: {
		color: "white",
		fontWeight: "600",
		fontSize: 14,
	},
	learnMoreButton: {
		padding: 12,
	},
	learnMoreText: {
		color: "orange",
		fontWeight: "600",
		fontSize: 14,
	},
	footer: {
		padding: 20,
		alignItems: "center",
		marginBottom: 20,
	},
	footerText: {
		fontSize: 14,
		color: "#718096",
		textAlign: "center",
	},
});
