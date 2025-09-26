import React, { useState, useEffect, useContext } from "react";
import DataContext from "../../../Context/DataContext";
import axios from "axios";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Dimensions,
    ActivityIndicator,
} from "react-native";
import Picker from "../../../Components/UIComp/Picker";
import Svg, {
    Rect,
    Text as SvgText,
    G,
    Defs,
    LinearGradient,
    Stop,
} from "react-native-svg";
import Animated, {
    useSharedValue,
    useAnimatedProps,
    withTiming,
    Easing,
} from "react-native-reanimated";

const { width: screenWidth } = Dimensions.get("window");

const AnimatedRect = Animated.createAnimatedComponent(Rect);

const PdSDiary = () => {
    const { token, userLogged } = useContext(DataContext);
    const options = [
        { label: "Sintomas", id: "a0a1d9b5-2268-4aed-9040-44fb3d88975e" },
        { label: "Movimento", id: "ee8cf8bb-36ff-4838-883b-75179867d095" },
        { label: "Emoções", id: "a8772285-cc12-47c0-b947-eeac0a790b7a" },
    ];
    const [selectedOpt, optToSelect] = useState(options[0]);
    const [frequentesData, setFrequentesData] = useState([]);
    const [intensosData, setIntensosData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hasData, setHasData] = useState(false);

    const fetchData = async (token, userLogged) => {
        try {
            const url = `https://api3.gps.med.br/API/diario/result/journal/${userLogged}/${selectedOpt.id}`;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const response = await axios.get(url, config);
            return response.data;
        } catch (error) {
            console.error("Error fetching indicadores:", error);
            throw error;
        }
    };

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchData(token, userLogged);

                // Check if data exists and has the expected structure
                if (data && data.frequentes && data.intensos) {
                    const frequentes = data.frequentes.map((item) => ({
                        nome: item.nome,
                        valor: parseInt(item.valor, 10),
                    }));
                    const intensos = data.intensos.map((item) => ({
                        nome: item.nome,
                        valor: parseInt(item.valor, 10),
                    }));

                    setFrequentesData(frequentes);
                    setIntensosData(intensos);
                    setHasData(frequentes.length > 0 || intensos.length > 0);
                } else {
                    setHasData(false);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Failed to load data. Please try again later.");
                setHasData(false);
            } finally {
                setLoading(false);
            }
        };

        if (token && userLogged) {
            fetch();
        } else {
            setLoading(false);
            setHasData(false);
            console.log("Token or userLogged not found");
        }
    }, [selectedOpt]);

    // Function to render a horizontal bar chart
    const renderBarChart = (data, title, percent = false) => {
        if (!data.length) return null;

        const maxValor = Math.max(...data.map((item) => item.valor));
        const barHeight = 50;
        const spacing = 10;
        const chartWidth = screenWidth - 40;

        return (
            <View style={styles.chartContainer}>
                <Text style={styles.chartTitle}>{title}</Text>
                <Svg width={chartWidth} height={4 * (barHeight + spacing)}>
                    <Defs>
                        <LinearGradient
                            id="gradient"
                            x1="0"
                            y1="0"
                            x2="1"
                            y2="0"
                        >
                            <Stop
                                offset="0%"
                                stopColor="#ff7f00"
                                stopOpacity="1"
                            />
                            <Stop
                                offset="100%"
                                stopColor="#ffb347"
                                stopOpacity="1"
                            />
                        </LinearGradient>
                    </Defs>
                    {data.map((item, index) => {
                        if (index >= 4) return null;
                        const y = index * (barHeight + spacing);

                        return (
                            <BarItem
                                key={item.nome}
                                item={item}
                                y={y}
                                barHeight={barHeight}
                                chartWidth={chartWidth}
                                maxValor={maxValor}
                                isPercentage={percent}
                            />
                        );
                    })}
                </Svg>
            </View>
        );
    };

    const BarItem = ({
        item,
        y,
        barHeight,
        chartWidth,
        maxValor,
        isPercentage = false,
    }) => {
        const animatedWidth = useSharedValue(0);

        useEffect(() => {
            animatedWidth.value = withTiming(
                (item.valor / maxValor) * chartWidth,
                {
                    duration: 800,
                    easing: Easing.out(Easing.ease),
                }
            );
        }, [item.valor]);

        const animatedProps = useAnimatedProps(() => ({
            width: animatedWidth.value,
        }));

        return (
            <G>
                <Rect
                    x={0}
                    y={y}
                    width={chartWidth}
                    height={barHeight}
                    fill="#e0e0e0"
                    rx={8}
                    ry={8}
                />
                <AnimatedRect
                    x={0}
                    y={y}
                    height={barHeight}
                    fill="url(#gradient)"
                    rx={8}
                    ry={8}
                    animatedProps={animatedProps}
                />
                <SvgText
                    x={10}
                    y={y + barHeight / 2 + 5}
                    fill="white"
                    fontSize={16}
                    fontWeight="bold"
                >
                    {item.nome}
                </SvgText>
                <SvgText
                    x={isPercentage ? chartWidth - 45 : chartWidth - 30}
                    y={y + barHeight / 2 + 5}
                    fill="white"
                    fontSize={16}
                    fontWeight="bold"
                >
                    {item.valor + (isPercentage && "%")}
                </SvgText>
            </G>
        );
    };

    const renderEmptyState = () => (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
                Não ha registros do usuario para visualizar nesta categoria
            </Text>
            <Text style={styles.emptySubText}>
                Faca seu primeiro registro ja e visualize suas informacoes!
            </Text>
        </View>
    );

    return (
        <View>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={{ marginTop: "5%" }}>
                    <Picker
                        options={options.map((opt) => opt.label)}
                        selectedOption={selectedOpt.label}
                        onSelect={(selectedLabel) => {
                            const selectedObj = options.find(
                                (opt) => opt.label === selectedLabel
                            );
                            if (selectedObj) optToSelect(selectedObj);
                        }}
                        isWidth={true}
                    />
                </View>

                {loading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#ff7f00" />
                    </View>
                ) : error ? (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>{error}</Text>
                    </View>
                ) : hasData ? (
                    <>
                        {renderBarChart(
                            frequentesData,
                            selectedOpt.label + " mais frequentes",
                            true
                        )}
                        {renderBarChart(
                            intensosData,
                            selectedOpt.label + " mais intensos"
                        )}
                    </>
                ) : (
                    renderEmptyState()
                )}

                <View style={{ height: 100 }}></View>
            </ScrollView>

            <View style={{ height: 50 }} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    content: {
        fontSize: 16,
        textAlign: "center",
        color: "#666",
        marginBottom: 20,
    },
    chartContainer: {
        width: "100%",
        marginBottom: 20,
    },
    chartTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 10,
    },
    button: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        borderWidth: 2,
        borderColor: "orange",
        borderRadius: 25,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    emptyText: {
        fontSize: 18,
        textAlign: "center",
        color: "#666",
        marginBottom: 10,
        fontWeight: "bold",
    },
    emptySubText: {
        fontSize: 16,
        textAlign: "center",
        color: "#999",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    errorContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    errorText: {
        fontSize: 16,
        textAlign: "center",
        color: "red",
    },
});

export default PdSDiary;
