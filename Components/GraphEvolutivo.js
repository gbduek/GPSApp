import { useEffect, useState, useContext, useCallback, useMemo } from "react";
import {
	View,
	ScrollView,
	ActivityIndicator,
	Platform,
	Dimensions,
	Text,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Picker from "./UIComp/Picker";
import * as d3 from "d3-shape";
import Svg, {
	Path,
	G,
	Circle,
	Text as SvgText,
	Rect,
	Line,
} from "react-native-svg";
import DataContext from "../Context/DataContext";
import moment from "moment";
import styles from "./styles/evolGraphStyles";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const YAxis = ({ minValue, maxValue, height = 250, graphHeight = 220 }) => {
	const range = maxValue - minValue;
	const step = graphHeight / 5;
	const topMargin = (height - graphHeight) / 2;

	return (
		<View style={[styles.yAxisContainer, { height }]}>
			<Svg width={40} height={height}>
				<Path
					d={`M30,${topMargin} L30,${topMargin + graphHeight}`}
					stroke="#666"
					strokeWidth="1.5"
				/>
				{Array.from({ length: 6 }).map((_, index) => {
					const value = Math.round(
						minValue + (range * (5 - index)) / 5
					);
					const yPos = topMargin + index * step;

					return (
						<G key={`y-tick-${index}`}>
							<Line
								x1={25}
								y1={yPos}
								x2={30}
								y2={yPos}
								stroke="#666"
								strokeWidth="1"
							/>
							<SvgText
								x={20}
								y={yPos + 3}
								fontSize="10"
								fill="#666"
								textAnchor="end"
							>
								{value}
							</SvgText>
						</G>
					);
				})}
			</Svg>
		</View>
	);
};

const XAxis = ({ data, width, height = 250, graphHeight = 220 }) => {
	if (!data || data.length === 0) return null;

	const topMargin = (height - graphHeight) / 2;
	const firstDate = new Date(data[0].Data);
	const lastDate = new Date(data[data.length - 1].Data);

	// Only show labels if we have enough space
	const showLabels = width > 300 && data.length < 20;

	return (
		<Svg width={width} height={30}>
			<Path d={`M40,0 L${width},0`} stroke="#666" strokeWidth="1.5" />

			{data.map((point, index) => {
				const xPos = 40 + (index * (width - 40)) / (data.length - 1);
				const date = new Date(point.Data);

				// Only show every nth label to prevent crowding
				const shouldShowLabel =
					showLabels &&
					(index === 0 ||
						index === data.length - 1 ||
						index % Math.ceil(data.length / 5) === 0);

				return (
					<G key={`x-tick-${index}`}>
						<Line
							x1={xPos}
							y1={0}
							x2={xPos}
							y2={5}
							stroke="#666"
							strokeWidth="1"
						/>
						{shouldShowLabel && (
							<SvgText
								x={xPos}
								y={20}
								fontSize="10"
								fill="#666"
								textAnchor="middle"
							>
								{moment(date).format("MMM D")}
							</SvgText>
						)}
					</G>
				);
			})}
		</Svg>
	);
};

const GraphEvolutivo = ({ id, refreshing, response }) => {
	const [apiData, setApiData] = useState([]);
	const { userLogged } = useContext(DataContext);
	const [selectedItem, setSelectedItem] = useState(null);
	const [loading, setLoading] = useState(false);
	const [selectedNome, setSelectedNome] = useState(null);
	const [nomeOptions, setNomeOptions] = useState([]);
	const [pickerDisplayMode, setPickerDisplayMode] = useState("scrollview");
	const [graphWidth, setGraphWidth] = useState(SCREEN_WIDTH * 2);

	// Constants for graph dimensions
	const GRAPH_HEIGHT = 220;
	const GRAPH_MARGIN = 20;
	const POINT_RADIUS = 10;
	const POINT_SPACING = 60; // Increased spacing between points

	const fetchData = async () => {
		try {
			setLoading(true);
			let fetchedData = response?.data?.GraficoEvolutivo || [];

			// Filter out items that shouldn't be shown
			fetchedData = fetchedData.filter(
				(entry) => entry.mostraGrafico !== false
			);

			// Extract unique "Nome" values
			const uniqueNome = [
				...new Set(fetchedData.map((entry) => entry.Nome)),
			];
			setNomeOptions(uniqueNome);

			// Apply the exception for specific IdMedicao (Exceptions List)
			if (uniqueNome.includes("IMC")) {
				fetchedData = fetchedData.filter(
					(entry) => entry.Nome === "IMC"
				);
				setNomeOptions(["IMC"]);
			}

			setApiData(fetchedData);

			if (uniqueNome.length >= 1) {
				setSelectedNome(uniqueNome[0]);
			}
		} catch (error) {
			console.error("API Error:", error);
			setApiData([]);
		} finally {
			setLoading(false);
		}
	};

	useFocusEffect(
		useCallback(() => {
			fetchData();
		}, [id, userLogged, response])
	);

	useEffect(() => {
		if (Platform.OS == "android") {
			setPickerDisplayMode("modal");
		}
	}, []);

	useEffect(() => {
		if (refreshing) {
			fetchData();
		}
	}, [refreshing]);

	const handlePointPress = (item) => {
		setSelectedItem(item);
	};

	const processedData = useMemo(() => {
		if (!selectedNome || apiData.length === 0) return [];

		const selectedData = apiData.find(
			(entry) => entry.Nome === selectedNome
		);
		if (!selectedData || !selectedData.Dados) return [];

		// Sort data by date
		const sortedData = [...selectedData.Dados].sort(
			(a, b) => new Date(a.Data) - new Date(b.Data)
		);

		// Calculate min and max values with some padding
		const values = sortedData.map((d) => d.Value);
		const minValue = Math.max(0, Math.min(...values) * 0.9);
		const maxValue = Math.min(100, Math.max(...values) * 1.1);

		// Calculate x positions with increased spacing
		const firstDate = new Date(sortedData[0].Data);
		const lastDate = new Date(sortedData[sortedData.length - 1].Data);
		const totalDays = moment(lastDate).diff(moment(firstDate), "days");

		return sortedData.map((item, index) => {
			const date = new Date(item.Data);
			const daysFromStart = moment(date).diff(moment(firstDate), "days");
			const x = 40 + index * POINT_SPACING; // Use fixed spacing instead of date-based
			const y =
				GRAPH_MARGIN +
				((maxValue - item.Value) / (maxValue - minValue)) *
					GRAPH_HEIGHT;

			return {
				x,
				y,
				value: item.Value,
				date: moment(date).format("DD/MM/YYYY"),
				time: moment(date).format("HH:mm"),
				color: item.Cor || selectedData.CorExibicao || "#666",
				key: `${selectedData.Id}-${index}`,
				rawData: item,
			};
		});
	}, [selectedNome, apiData, graphWidth]);

	const renderGraph = () => {
		if (loading) {
			return (
				<View style={styles.loadingContainer}>
					<ActivityIndicator size="large" color="#FFA500" />
				</View>
			);
		}

		if (processedData.length === 0) {
			return (
				<View style={styles.noDataContainer}>
					<Text style={styles.noDataText}>No data available</Text>
				</View>
			);
		}

		// Calculate min and max values from processed data
		const values = processedData.map((d) => d.value);
		const padding = (Math.max(...values) - Math.min(...values)) * 0.1;
		const minValue = Math.min(...values) - padding;
		const maxValue = Math.max(...values) + padding;

		// Create the line path
		const line = d3
			.line()
			.x((d) => d.x)
			.y((d) => d.y)
			.curve(d3.curveMonotoneX);

		// Calculate graph width based on point spacing
		const calculatedWidth = Math.max(
			SCREEN_WIDTH,
			40 + processedData.length * POINT_SPACING
		);

		return (
			<View style={styles.graphContainer}>
				<YAxis
					minValue={minValue}
					maxValue={maxValue}
					height={GRAPH_HEIGHT + GRAPH_MARGIN * 2}
					graphHeight={GRAPH_HEIGHT}
				/>

				<ScrollView
					horizontal
					contentContainerStyle={{ width: calculatedWidth }}
					showsHorizontalScrollIndicator={false}
					onContentSizeChange={(w) =>
						setGraphWidth(Math.max(w, SCREEN_WIDTH))
					}
				>
					<View>
						<Svg
							width={calculatedWidth}
							height={GRAPH_HEIGHT + GRAPH_MARGIN * 2}
						>
							{/* Grid lines */}
							{Array.from({ length: 6 }).map((_, index) => {
								const yPos =
									GRAPH_MARGIN + index * (GRAPH_HEIGHT / 5);
								return (
									<Line
										key={`grid-line-${index}`}
										x1={40}
										y1={yPos}
										x2={calculatedWidth}
										y2={yPos}
										stroke="#eee"
										strokeWidth="1"
									/>
								);
							})}

							{/* Main line */}
							<Path
								d={line(processedData)}
								stroke={"gray"}
								strokeWidth="3"
								fill="none"
							/>

							{/* Points */}
							{processedData.map((point) => (
								<G key={point.key}>
									<Circle
										cx={point.x}
										cy={point.y}
										r={POINT_RADIUS}
										fill="white"
										stroke={point.color}
										strokeWidth="3"
										onPress={() => handlePointPress(point)}
									/>
									{selectedItem?.key === point.key && (
										<G>
											<Rect
												x={point.x - 60}
												y={
													point.y > 60
														? point.y - 80
														: point.y + 15
												}
												width={120}
												height={60}
												rx={5}
												fill="white"
												stroke={point.color}
												strokeWidth="1.5"
											/>
											<SvgText
												x={point.x}
												y={
													point.y > 60
														? point.y - 60
														: point.y + 35
												}
												fontSize="12"
												fill="#333"
												textAnchor="middle"
												fontWeight="bold"
											>
												{point.value}
											</SvgText>
											<SvgText
												x={point.x}
												y={
													point.y > 60
														? point.y - 45
														: point.y + 50
												}
												fontSize="10"
												fill="#666"
												textAnchor="middle"
											>
												{point.date}
											</SvgText>
											<SvgText
												x={point.x}
												y={
													point.y > 60
														? point.y - 30
														: point.y + 65
												}
												fontSize="10"
												fill="#666"
												textAnchor="middle"
											>
												{point.time}
											</SvgText>
										</G>
									)}
								</G>
							))}
						</Svg>

						<XAxis
							data={processedData.map((d) => d.rawData)}
							width={calculatedWidth}
							graphHeight={GRAPH_HEIGHT}
						/>
					</View>
				</ScrollView>
			</View>
		);
	};

	return (
		<View style={styles.container}>
			<Picker
				options={nomeOptions}
				selectedOption={
					selectedNome || nomeOptions[0] || "Select a metric"
				}
				onSelect={(option) => {
					setSelectedNome(option);
					setSelectedItem(null);
				}}
				displayMode={pickerDisplayMode}
			/>

			{renderGraph()}
		</View>
	);
};

export default GraphEvolutivo;
