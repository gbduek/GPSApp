import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';
import * as d3 from 'd3-shape';
import Svg, { Circle, Path, Text as SvgText, G, Image } from 'react-native-svg';
import DataContext from '../Context/DataContext';

const GraphDiary = ({ DiaryId }) => {
    const [apiData, setApiData] = useState([]);
    const { token, userLogged } = useContext(DataContext);
    const [selectedItem, setSelectedItem] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = 'https://api3.gps.med.br/API/diario/diarios';
                const headers = {
                    Authorization: `Bearer ${token}`
                };
                const body = {
                    pessoa: userLogged,
                    tipoDiario: DiaryId,
                    dadoTipoDiario: null,
                    dataInicio: null,
                    dataFinal: null
                };

                const response = await axios.post(url, body, { headers });
                console.log('API Response:', response.data);
                setApiData(response.data); // Update state with API response data
            } catch (error) {
                console.error('API Error:', error);
                // Handle error
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handlePointPress = (item) => {
        setSelectedItem(item);
    };

    const renderPoints = () => {
        if (apiData.length === 0) return null;

        const maxY = Math.max(...apiData.map(entry => entry.intensidade));
        const data = apiData.map((entry, index) => ({
            x: (index + 1) * 50, // Example: Adjust x-coordinates as needed
            y: 300 - (entry.intensidade * 3), // Adjust y-coordinates based on intensidade
            tooltip: entry.emocao.tooltip,
            image: entry.emocao.imagem
        }));

        const line = d3.line()
            .x((d) => d.x)
            .y((d) => d.y)
            .curve(d3.curveCardinal);

        return (
            <Svg height="300" width="100%">
                <Path d={line(data)} stroke="#4682B4" strokeWidth="2" fill="none" />
                {data.map((point, index) => (
                    <G key={index}>
                        <Circle
                            cx={point.x}
                            cy={point.y}
                            r={6}
                            fill="#4682B4"
                            onPress={() => handlePointPress(point)}
                        />
                        {selectedItem && selectedItem.x === point.x && selectedItem.y === point.y && (
                            <G>
                                <Image
                                    x={point.x + 10}
                                    y={point.y - 25}
                                    width="50"
                                    height="50"
                                    href={{ uri: point.image }} // Use point.image for actual image
                                />
                                <SvgText
                                    x={point.x + 70}
                                    y={point.y}
                                    fontSize="12"
                                    fill="black"
                                    textAnchor="start"
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
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
                <Text style={styles.title}>Emotion Intensity Graph</Text>
                <View style={styles.chart}>
                    {renderPoints()}
                </View>
                {selectedItem && (
                    <View style={styles.detailsContainer}>
                        <Text style={styles.detailsText}>Selected Emotion: {selectedItem.tooltip}</Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 10,
    },
    chart: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    detailsContainer: {
        marginTop: 20,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#f0f0f0',
    },
    detailsText: {
        fontSize: 16,
    },
});

export default GraphDiary;
