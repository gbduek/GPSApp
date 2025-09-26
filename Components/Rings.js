import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import axios from "axios";
import Svg, { Circle } from "react-native-svg";
import DataContext from "../Context/DataContext";
import { Ionicons } from "@expo/vector-icons";

const Rings = ({ iconName, dimen, isPds = false, pdsData }) => {
    const { token, userLogged } = useContext(DataContext);
    const [redPercentage, setRedPercentage] = useState(0);
    const [yellowPercentage, setYellowPercentage] = useState(0);
    const [greenPercentage, setGreenPercentage] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = isPds
                    ? pdsData
                    : await fetchIndicadores(token, userLogged);
                calculatePercentages(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        if (token && userLogged) {
            fetchData();
        } else {
            console.log("Token or userLogged not found");
        }
    }, [userLogged]);

    const fetchIndicadores = async (token, userLogged) => {
        try {
            const url =
                "https://api3.gps.med.br/API/DadosIndicadores/resultados-indicadores";
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const body = {
                idPessoaFisica: userLogged,
                indicador: null,
                risco: null,
                dimensao: null,
                dataInicio: null,
                dataFim: null,
                pesquisa: dimen,
            };

            const response = await axios.post(url, body, config);
            return response.data;
        } catch (error) {
            console.error("Error fetching indicadores:", error);
            throw error;
        }
    };

    const calculatePercentages = (data) => {
        let redCount = 0;
        let yellowCount = 0;
        let greenCount = 0;
        let totalCount = 0;

        data.forEach((item) => {
            // Over here, checks if the data is received from the request or from PdS file (Which has the same request)
            if (isPds === false) {
                if (item.indicadores) {
                    const parsedIndicadores = JSON.parse(item.indicadores);
                    parsedIndicadores.forEach((sub) => {
                        sub.Subs.forEach((subItem) => {
                            if (subItem.Grau === 3) redCount++;
                            else if (subItem.Grau === 2) yellowCount++;
                            else if (subItem.Grau === 1) greenCount++;
                            totalCount++;
                        });
                    });
                }
            } else {
                // Here, its not necessary to JSON.parse the object, since it is already parsed in PdS.js
                item.forEach((sub) => {
                    sub.subs.forEach((subItem) => {
                        if (subItem.grau) {
                            if (subItem.grau === 3) redCount++;
                            else if (subItem.grau === 2) yellowCount++;
                            else if (subItem.grau === 1) greenCount++;
                            totalCount++;
                        }
                    });
                });
            }
        });

        if (totalCount > 0) {
            setRedPercentage(Math.min((redCount / totalCount) * 100), 100);
            setYellowPercentage(
                Math.min((yellowCount / totalCount) * 100),
                100
            );
            setGreenPercentage(Math.min((greenCount / totalCount) * 100), 100);
        }
    };

    // Calculate the angles for each color
    const redAngle = (redPercentage / 100) * 360;
    const yellowAngle = (yellowPercentage / 100) * 360;
    const greenAngle = (greenPercentage / 100) * 360;

    return (
        <View style={styles.container}>
            <Svg width="120" height="120">
                {/* Green Circle */}
                <Circle
                    cx="60"
                    cy="60"
                    r="47"
                    stroke="#4CAF50"
                    strokeWidth="22"
                    fill="transparent"
                    strokeDasharray={`${greenAngle}, 360`}
                    transform="rotate(-90, 60, 60)"
                />
                {/* Yellow Circle */}
                <Circle
                    cx="60"
                    cy="60"
                    r="47"
                    stroke="#FFE500"
                    strokeWidth="22"
                    fill="transparent"
                    strokeDasharray={`${yellowAngle}, 360`}
                    transform={`rotate(${greenAngle - 90}, 60, 60)`}
                />
                {/* Red Circle */}
                <Circle
                    cx="60"
                    cy="60"
                    r="47"
                    stroke="#EF4040"
                    strokeWidth="22"
                    fill="transparent"
                    strokeDasharray={`${redAngle}, 360`}
                    transform={`rotate(${
                        greenAngle + yellowAngle - 90
                    }, 60, 60)`}
                />
            </Svg>
            <View style={styles.iconContainer}>
                {iconName && (
                    <Ionicons name={iconName} size={48} color="#ffa500" />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        alignItems: "center",
        marginBottom: 20,
        backgroundColor: "white",
    },
    iconContainer: {
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "transparent",
        top: 35,
    },
});

export default Rings;
