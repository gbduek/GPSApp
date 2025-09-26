import React, { useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	FlatList,
	ScrollView,
	Modal,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const Picker = ({
	options,
	selectedOption,
	onSelect,
	displayMode = "flatlist",
	isWidth = false,
}) => {
	const [isSelectorOpen, setIsSelectorOpen] = useState(false);

	const handleSelectorPress = () => setIsSelectorOpen(!isSelectorOpen);

	const handleOptionPress = (option) => {
		onSelect(option);
		setIsSelectorOpen(false);
	};

	const renderOption = (option, index) => (
		<TouchableOpacity
			key={index}
			style={styles.option}
			onPress={() => handleOptionPress(option)}
			accessibilityLabel={`Option ${option}`}
		>
			<Text style={styles.optionText}>{option}</Text>
		</TouchableOpacity>
	);

	return (
		<View>
			<TouchableOpacity
				style={[
					styles.selector,
					isSelectorOpen && styles.selectorOpen,
					isWidth && { width: "100%" },
				]}
				onPress={handleSelectorPress}
				accessibilityLabel="Toggle picker"
			>
				<Text style={styles.selectorText}>{selectedOption}</Text>
				<FontAwesome
					name={isSelectorOpen ? "angle-up" : "angle-down"}
					size={22}
					color="orange"
				/>
			</TouchableOpacity>
			{isSelectorOpen && (
				<View style={styles.optionsContainer}>
					{options.length > 4 ? (
						displayMode === "flatlist" ? (
							<FlatList
								data={options}
								renderItem={({ item, index }) =>
									renderOption(item, index)
								}
								keyExtractor={(item, index) => index.toString()}
								style={styles.flatList}
							/>
						) : displayMode === "scrollview" ? (
							<ScrollView style={styles.scrollView}>
								{options.map(renderOption)}
							</ScrollView>
						) : displayMode === "modal" ? (
							<Modal
								transparent={true}
								visible={isSelectorOpen}
								onRequestClose={() => setIsSelectorOpen(false)}
								animationType="slide"
							>
								<View style={styles.modalContainer}>
									<View style={styles.modalContent}>
										<ScrollView style={styles.scrollView}>
											{options.map(renderOption)}
										</ScrollView>
										<TouchableOpacity
											style={styles.closeButton}
											onPress={() =>
												setIsSelectorOpen(false)
											}
										>
											<Text
												style={styles.closeButtonText}
											>
												Fechar
											</Text>
										</TouchableOpacity>
									</View>
								</View>
							</Modal>
						) : null
					) : (
						options.map(renderOption)
					)}
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	selector: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 10,
		borderWidth: 2,
		borderColor: "orange",
		borderRadius: 25,
		marginBottom: 20,
	},
	selectorOpen: {
		marginBottom: 10,
	},
	selectorText: {
		fontSize: 16,
		color: "#1E1E1E",
		fontWeight: "bold",
	},
	optionsContainer: {
		backgroundColor: "white",
		borderWidth: 2,
		borderColor: "orange",
		borderRadius: 10,
		marginBottom: 10,
		maxHeight: 200, // Adjust the max height as needed
	},
	flatList: {
		maxHeight: 100, // Adjust the max height as needed
	},
	scrollView: {
		maxHeight: 100, // Adjust the max height as needed
	},
	option: {
		padding: 10,
		borderBottomWidth: 1,
		borderBottomColor: "orange",
	},
	optionText: {
		fontSize: 16,
		color: "#6A6363",
	},
	modalContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	modalContent: {
		width: "80%",
		backgroundColor: "white",
		borderRadius: 10,
		padding: 20,
	},
	closeButton: {
		marginTop: 10,
		padding: 10,
		alignItems: "center",
		borderWidth: 2,
		borderColor: "orange",
		borderRadius: 10,
	},
	closeButtonText: {
		fontSize: 16,
		color: "orange",
		fontWeight: "bold",
	},
});

export default Picker;
