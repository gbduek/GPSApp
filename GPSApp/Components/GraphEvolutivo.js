import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';
import * as d3 from 'd3-shape';
import Svg, { Path, G, Circle, Text as SvgText, Rect } from 'react-native-svg';
import DataContext from '../Context/DataContext';

const emotionImages = {
    Medo: require('../assets/emotions/scared.png'),
    Ansiedade: require('../assets/emotions/anxious.png'),
    Alegria: require('../assets/emotions/happy.png'),
    Tristeza: require('../assets/emotions/sad.png'),
    Nojo: require('../assets/emotions/disgust.png'),
    Raiva: require('../assets/emotions/angry.png'),
};

const YAxis = () => {
    const height = 250;
    const step = height / 10;

    return (
        <View style={styles.yAxisContainer}>
            <Svg width={40} height={height}>
                <Path d={`M20,7 L20,${height}`} stroke="black" strokeWidth="2" />
                {Array.from({ length: 10 }, (_, index) => (
                    <SvgText
                        key={index}
                        x={30}
                        y={height - ((index + 1) * step) + 20}
                        fontSize="10"
                        fill="black"
                        textAnchor="middle"
                    >
                        {index * 10}  {/* Adjust based on scale */}
                    </SvgText>
                ))}
            </Svg>
        </View>
    );
};

const GraphEvolutivo = ({ id }) => {
    const [apiData, setApiData] = useState([]);
    const { token, userLogged } = useContext(DataContext);
    const [selectedItem, setSelectedItem] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = `https://api3.gps.med.br/API/DadosIndicadores/page-data/${userLogged}/${id}`;
                const headers = {
                    Authorization: `Bearer ${token}`
                };

                const response = await axios.get(url, { headers });
                const fetchedData = response.data.GraficoEvolutivo || [];
                setApiData(fetchedData);
            } catch (error) {
                console.error('API Error:', error);
                setApiData([]); // Set to empty array on error
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id, token, userLogged]);

    const handlePointPress = (item) => {
        setSelectedItem(item);
    };

    const processData = (data) => {
        // Find max and min values
        const allValues = data.flatMap(entry => entry.Dados.map(d => d.Value));
        const maxValue = Math.max(...allValues);
        const minValue = Math.min(...allValues);

        // Set x-axis spacing
        const xSpacing = 80;
        let xOffset = 0;

        return data.flatMap((entry) =>
            entry.Dados.map((item, index) => {
                const x = xOffset;
                const y = 250 - ((item.Value - minValue) / (maxValue - minValue) * 250); // Scale y-axis
                xOffset += xSpacing; // Update x position for the next point

                return {
                    x,
                    y,
                    tooltip: item.Description || '',
                    date: new Date(item.Data).toLocaleDateString() || null,
                    color: entry.CorExibicao,
                    key: `${entry.Id}-${index}`
                };
            })
        );
    };

    const renderPoints = () => {
        if (apiData.length === 0) return null;

        const data = processData(apiData);

        const line = d3.line()
            .x(d => d.x + 40)
            .y(d => d.y + 40)
            .curve(d3.curveCardinal);

        const svgWidth = Math.max(data.length * 80 + 50, 300); // Ensure a minimum width
        const svgHeight = 310;

        return (
            <Svg width={svgWidth} height={svgHeight}>
                <Path d={line(data)} stroke="black" strokeWidth="2" fill="none" />
                {data.map((point) => (
                    <G key={point.key}>
                        <Circle
                            cx={point.x + 40}
                            cy={point.y + 40}
                            r={12}
                            fill={point.color || 'gray'}
                            onPress={() => handlePointPress(point)}
                        />
                        {selectedItem && selectedItem.key === point.key && (
                            <G>
                                <Rect
                                    x={point.x + 15}
                                    y={point.y - 20}
                                    width="90"
                                    height="35"
                                    fill="black"
                                    stroke="black"
                                    strokeWidth="1"
                                    rx="5"
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
                    </G>
                ))}
            </Svg>
        );
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#FFA500" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <YAxis />
            <ScrollView
                horizontal
                contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}
                showsHorizontalScrollIndicator={false}
            >
                <View style={styles.graphContainer}>
                    <View style={styles.graphWrapper}>
                        {renderPoints()}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    loadingContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    graphContainer: {
        flexDirection: 'row',
    },
    yAxisContainer: {
        position: 'absolute',
        left: -15,
        top: 35,
        bottom: 0,
        backgroundColor: 'white',
        zIndex: 1,
        elevation: 3,
        shadowColor: '#000',
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

export default GraphEvolutivo;
