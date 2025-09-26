import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import * as d3 from "d3-shape";
import Svg, {
	Path,
	G,
	Circle,
	Image,
	Text as SvgText,
	Rect,
} from "react-native-svg";

const emotionImages = {
	Medo: require("../assets/emotions/scared.png"),
	Ansiedade: require("../assets/emotions/anxious.png"),
	Alegria: require("../assets/emotions/happy.png"),
	Tristeza: require("../assets/emotions/sad.png"),
	Nojo: require("../assets/emotions/disgust.png"),
	Raiva: require("../assets/emotions/angry.png"),
};

const YAxis = () => {
	// Define the range and step of the Y-axis
	const height = 250;
	const step = height / 10;

	return (
		<View style={styles.yAxisContainer}>
			<Svg width={40} height={height}>
				{/* Draw the axis lines */}
				<Path
					d={`M20,7 L20,${height}`}
					stroke="black"
					strokeWidth="2"
				/>

				{/* Add Y-axis labels */}
				{Array.from({ length: 10 }, (_, index) => (
					<SvgText
						key={index}
						x={30}
						y={height - (index + 1) * step + 20}
						fontSize="10"
						fill="black"
						textAnchor="middle"
					>
						{index + 1}
					</SvgText>
				))}
			</Svg>
		</View>
	);
};

const GraphDiary = ({ DiaryId, entries }) => {
	const [selectedItem, setSelectedItem] = useState(null);

	const handlePointPress = (item) => {
		setSelectedItem(item);
	};

	const processData = (data) => {
		const length = data.length;

		switch (DiaryId) {
			case "a8772285-cc12-47c0-b947-eeac0a790b7a":
				return data.map((_, index) => {
					const entry = data[length - 1 - index];
					return {
						x: (index + 1) * 80,
						y: 300 - (entry.intensidade / 10) * 25,
						tooltip: entry.emocao.tooltip || "",
						image: emotionImages[entry.emocao.nome] || null,
						date:
							new Date(entry.inicio).toLocaleDateString() || null,
					};
				});

			case "ee8cf8bb-36ff-4838-883b-75179867d095":
				return data.map((_, index) => {
					const entry = data[length - 1 - index];
					return {
						x: (index + 1) * 80,
						y: 300 - (entry.intensidade / 10) * 25,
						tooltip:
							entry.atividades.length > 0
								? entry.atividades[0]?.nome
								: "No Activity",
						image: null,
						date:
							new Date(entry.inicio).toLocaleDateString() || null,
					};
				});

			case "a0a1d9b5-2268-4aed-9040-44fb3d88975e":
				return data.map((_, index) => {
					const entry = data[length - 1 - index];
					return {
						x: (index + 1) * 80,
						y: 300 - (entry.intensidade / 10) * 25,
						tooltip:
							entry.sintomas.length > 0
								? entry.sintomas[0]?.nome
								: "No symptoms",
						image: null,
						date:
							new Date(entry.inicio).toLocaleDateString() || null,
					};
				});

			default:
				return [];
		}
	};

	const renderPoints = () => {
		if (entries.length === 0) return null;

		const data = processData(entries);

		const line = d3
			.line()
			.x((d) => d.x)
			.y((d) => d.y)
			.curve(d3.curveCardinal);

		const svgWidth = data.length * 110;
		const svgHeight = 310;

		return (
			<Svg width={svgWidth} height={svgHeight}>
				<Path
					d={line(data)}
					stroke="black"
					strokeWidth="2"
					fill="none"
				/>
				{data.map((point, index) => (
					<G key={index}>
						{selectedItem &&
							selectedItem.x === point.x &&
							selectedItem.y === point.y && (
								<G>
									<Rect
										x={point.x + 15}
										y={point.y - 20}
										width="90"
										height="35"
										fill="black"
										stroke="black"
										strokeWidth="1"
										rx="5" // rounded corners
										opacity="0.7"
									/>
									<SvgText
										x={point.x + 20}
										y={point.y - 5}
										fontSize="12"
										fill="white"
										textAnchor="start"
										fontWeight="bold"
									>
										{point.date}
									</SvgText>
									<SvgText
										x={point.x + 20}
										y={point.y + 10}
										fontSize="12"
										fill="white"
										textAnchor="start"
										fontWeight="bold"
									>
										{point.tooltip}
									</SvgText>
								</G>
							)}

						{point.image ? (
							<Image
								x={point.x - 12}
								y={point.y - 12}
								width="24"
								height="24"
								href={point.image}
								onPress={() => handlePointPress(point)}
							/>
						) : (
							<Circle
								cx={point.x}
								cy={point.y}
								r={12}
								fill="gray"
								onPress={() => handlePointPress(point)}
							/>
						)}
					</G>
				))}
			</Svg>
		);
	};

	return (
		<View style={styles.container}>
			<YAxis />
			<ScrollView
				horizontal
				contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}
				showsHorizontalScrollIndicator={false}
			>
				<View style={styles.graphContainer}>
					<View style={styles.graphWrapper}>{renderPoints()}</View>
				</View>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	loadingContainer: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	graphContainer: {
		flexDirection: "row",
	},
	yAxisContainer: {
		position: "absolute",
		left: -15,
		top: 35,
		bottom: 0,
		backgroundColor: "white",
		zIndex: 1,
		elevation: 3, // For Android shadow
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
	},
	graphWrapper: {
		marginLeft: 0,
		flex: 1,
	},
	chart: {
		marginTop: 0,
	},
});

export default GraphDiary;
