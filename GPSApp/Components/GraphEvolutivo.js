import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator, Platform } from 'react-native';
import Picker from './UIComp/Picker';
import axios from 'axios';
import * as d3 from 'd3-shape';
import Svg, { Path, G, Circle, Text as SvgText, Rect } from 'react-native-svg';
import DataContext from '../Context/DataContext';

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
    const [selectedNome, setSelectedNome] = useState(null);
    const [nomeOptions, setNomeOptions] = useState([]);
    const [pickerDisplayMode, setPickerDisplayMode] = useState('scrollview');

    useEffect(() => {
        {/* The Picker is set to be a Modal, instead of list, if the user is using Android */}
        if (Platform.OS === 'android') {
            setPickerDisplayMode('modal');
        }

        const fetchData = async () => {
            try {
                const url = `https://api3.gps.med.br/API/DadosIndicadores/page-data/${userLogged}/${id}`;
                const headers = {
                    Authorization: `Bearer ${token}`
                };

                const response = await axios.get(url, { headers });
                const fetchedData = response.data.GraficoEvolutivo || [];
                setApiData(fetchedData);

                // Extract unique "Nome" values
                const uniqueNome = [...new Set(fetchedData.map(entry => entry.Nome))];
                setNomeOptions(uniqueNome);

                if (uniqueNome.length === 1) {
                    setSelectedNome(uniqueNome[0]);
                }
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
        const filteredData = selectedNome ? data.filter(entry => entry.Nome === selectedNome) : data;
    
        const minValue = Math.min(...data.flatMap(entry => entry.Dados.map(d => d.Value)));
        const maxValue = Math.max(...data.flatMap(entry => entry.Dados.map(d => d.Value)));
    
        const defaultY = 80;
    
        if (filteredData.length === 1 && filteredData[0].Dados.length === 1) {
            const item = filteredData[0].Dados[0];
            const y = 244 - ((item.Value - minValue) / (maxValue - minValue) * 200);
            return [{
                x: 45, // Position near the y-axis
                y: isNaN(y) ? defaultY : y,
                tooltip: filteredData[0].Nome + item.Value || '',
                date: new Date(item.Data).toLocaleDateString() || null,
                color: filteredData[0].CorExibicao,
                key: `${filteredData[0].Id}-${0}`
            }];
        }
    
        const xSpacing = 80;
        let xOffset = 0;
    
        return filteredData.flatMap((entry) =>
            entry.Dados.map((item, index) => {
                const x = xOffset;
                const y = 250 - ((item.Value - minValue) / (maxValue - minValue) * 250);
                xOffset += xSpacing;
    
                return {
                    x,
                    y: isNaN(y) ? defaultY : y,
                    tooltip: entry.Nome + item.Value || '',
                    date: new Date(item.Data).toLocaleDateString() || null,
                    color: item.Cor,
                    key: `${entry.Id}-${index}`
                };
            })
        );
    };
    

    const renderPoints = () => {
        if (apiData.length === 0) return null;

        const data = processData(apiData);

        if (data.length === 1) {
            // Render single point
            const point = data[0];
            return (
                <Svg width={400} height={300}>
                    <Circle
                        cx={point.x}
                        cy={point.y}
                        r={12}
                        fill={point.color || 'gray'}
                        onPress={() => handlePointPress(point)}
                    />
                    {selectedItem && selectedItem.key === point.key && (
                        <G>
                            <Rect
                                x={point.x + 15}
                                y={point.y + 20}
                                width="90"
                                height="35"
                                fill="black"
                                stroke="black"
                                strokeWidth="1"
                                rx="5"
                                opacity="0.7"
                            />
                            <SvgText
                                x={point.x + 18}
                                y={point.y + 50}
                                fontSize="12"
                                fill="white"
                                textAnchor="start"
                                fontWeight="bold"
                            >
                                {point.tooltip}
                            </SvgText>
                            <SvgText
                                x={point.x + 18}
                                y={point.y + 33}
                                fontSize="12"
                                fill="white"
                                textAnchor="start"
                                fontWeight="bold"
                            >
                                {point.date}
                            </SvgText>
                        </G>
                    )}
                </Svg>
            );
        }

        // Render line if more than one point
        const line = d3.line()
            .x(d => d.x + 40)
            .y(d => d.y + 40)
            .curve(d3.curveCardinal);

        const svgWidth = Math.max(data.length * 80 + 50, 300);
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
                                    x={point.x + 55}
                                    y={point.y + 20}
                                    width="90"
                                    height="35"
                                    fill="black"
                                    stroke="black"
                                    strokeWidth="1"
                                    rx="5"
                                    opacity="0.7"
                                />
                                <SvgText
                                    x={point.x + 58}
                                    y={point.y + 50}
                                    fontSize="12"
                                    fill="white"
                                    textAnchor="start"
                                    fontWeight="bold"
                                >
                                    {point.tooltip}
                                </SvgText>
                                <SvgText
                                    x={point.x + 58}
                                    y={point.y + 33}
                                    fontSize="12"
                                    fill="white"
                                    textAnchor="start"
                                    fontWeight="bold"
                                >
                                    {point.date}
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
            <Picker
                options={nomeOptions}
                selectedOption={selectedNome || 'Selecione uma opção'}
                onSelect={(option) => setSelectedNome(option)}
                displayMode={pickerDisplayMode}
            />
            <ScrollView
                horizontal
                contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}
                showsHorizontalScrollIndicator={false}
            >
                {renderPoints()}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 20,
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
        top: 100,
        bottom: 0,
        backgroundColor: 'white',
    },
    graphWrapper: {
        marginLeft: 0,
        flex: 1,
    },
});

export default GraphEvolutivo;
