import React, { useState } from "react";
import {
	Modal,
	View,
	Text,
	TouchableOpacity,
	FlatList,
	Image,
	StyleSheet,
} from "react-native";

const ListSymptoms = ({ visible, onClose, symptoms, onSelectSymptom }) => {
	const [selectedRegion, setSelectedRegion] = useState(null);

	const bodyRegions = [
		{
			id: "general",
			name: "Geral",
			search: "bf48617d-46e3-44a4-a70f-19b6334d9356",
		},
		{
			id: "head",
			name: "Cabeça",
			search: "0eb863e4-4d4e-4864-9b77-d34c8876e716",
		},
		{
			id: "chest",
			name: "Tórax",
			search: "33d01124-455a-4018-8ea1-d7bd16efc46f",
		},
		{
			id: "abdomen",
			name: "Abdômen",
			search: "50a5b24e-62b9-4342-92e5-9e53e24d5400",
		},
		{
			id: "arms",
			name: "Braços",
			search: "f098afad-9ff1-4e0c-96e5-94ef125bec4a",
		},
		{
			id: "leg",
			name: "Perna",
			search: "0c0f8a54-5a4d-447c-ae58-76304fa6ce91",
		},
		{
			id: "skin",
			name: "Pele",
			search: "4ad0c718-b9f9-402a-97eb-e0e5d5aa8e35",
		},
		{
			id: "back",
			name: "Costas",
			search: "5646d265-45be-48a5-b642-ac702ea62944",
		},
		{
			id: "feet",
			name: "Pé e Tornozelo",
			search: "6ed987bb-c027-4955-8789-0cf39f68ef10",
		},
		{
			id: "hands",
			name: "Mão e punho",
			search: "7130c9c7-bc5f-4734-9362-e5e61936577e",
		},
		{
			id: "pelvis",
			name: "Pelve",
			search: "abbd36d8-9a75-4fdb-8f06-075ce03be8a4",
		},
	];

	const filteredSymptoms = selectedRegion
		? symptoms.filter((symptom) =>
				// Check if any object in partesCorpo array has an id that matches selectedRegion
				symptom.partesCorpo.some((part) => part.id === selectedRegion)
		  )
		: symptoms; // If no region selected, show all symptoms

	return (
		<Modal visible={visible} animationType="slide" transparent>
			<View style={styles.overlay}>
				<View style={styles.modalContainer}>
					<Text style={styles.title}>
						Selecione uma região do corpo
					</Text>

					{/* Human Body Image Placeholder */}
					{/* <Image
						source={require("../../assets/body.png")}
						style={styles.bodyImage}
					/> */}

					<View style={styles.regionButtons}>
						{bodyRegions.map((region) => (
							<TouchableOpacity
								key={region.search}
								style={[
									styles.regionButton,
									selectedRegion === region.search &&
										styles.selectedButton,
								]}
								onPress={() => setSelectedRegion(region.search)}
							>
								<Text style={styles.regionText}>
									{region.name}
								</Text>
							</TouchableOpacity>
						))}
					</View>

					<Text style={styles.subtitle}>Sintomas</Text>
					<FlatList
						data={filteredSymptoms}
						keyExtractor={(item, index) => index.toString()}
						renderItem={({ item }) => (
							<TouchableOpacity
								style={styles.symptomItem}
								onPress={() => onSelectSymptom(item)}
							>
								<Text
									style={{
										fontWeight: "bold",
										fontSize: 18,
									}}
								>
									{item.nome}
								</Text>
							</TouchableOpacity>
						)}
						ListEmptyComponent={
							<Text style={styles.noSymptoms}>
								Nenhum sintoma encontrado.
							</Text>
						}
						style={{ maxHeight: "60%" }}
					/>

					<TouchableOpacity
						style={styles.closeButton}
						onPress={onClose}
					>
						<Text style={styles.closeButtonText}>Fechar</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.5)",
		justifyContent: "center",
		alignItems: "center",
	},
	modalContainer: {
		width: "90%",
		height: "90%",
		backgroundColor: "white",
		padding: 20,
		borderRadius: 10,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		textAlign: "center",
		marginTop: 20,
		marginBottom: 20,
		color: "orange",
	},
	bodyImage: {
		width: 150,
		height: 300,
		alignSelf: "center",
		marginVertical: 10,
	},
	regionButtons: {
		flexDirection: "row",
		justifyContent: "space-evenly", // Spacing between buttons
		flexWrap: "wrap", // Allow buttons to wrap
		maxWidth: "100%", // Limit the width to 100% of the modal
	},
	regionButton: {
		padding: 10,
		backgroundColor: "#FFA500",
		borderRadius: 5,
		marginTop: 5,
	},
	selectedButton: {
		backgroundColor: "#FF7F00",
	},
	regionText: {
		color: "white",
		fontWeight: "bold",
	},
	subtitle: {
		fontSize: 18,
		fontWeight: "bold",
		marginTop: 50,
		color: "orange",
	},
	symptomItem: {
		padding: 10,
		borderBottomWidth: 1,
		borderBottomColor: "#ddd",
	},
	noSymptoms: {
		textAlign: "center",
		marginVertical: 10,
	},
	closeButton: {
		marginTop: 20,
		backgroundColor: "#FF4500",
		padding: 10,
		borderRadius: 5,
		alignItems: "center",
	},
	closeButtonText: {
		color: "white",
		fontWeight: "bold",
	},
});

export default ListSymptoms;
