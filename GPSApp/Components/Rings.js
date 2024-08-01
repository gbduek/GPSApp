import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet} from 'react-native';
import axios from 'axios';
import Svg, { Circle } from 'react-native-svg';
import DataContext from '../Context/DataContext';
import { Ionicons } from '@expo/vector-icons';

const Rings = ({ iconName, dimen }) => {
  const { token, userLogged } = useContext(DataContext);
  const [categoriesData, setCategoriesData] = useState([]);
  const [redPercentage, setRedPercentage] = useState(0);
  const [yellowPercentage, setYellowPercentage] = useState(0);
  const [greenPercentage, setGreenPercentage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchIndicadores(token, userLogged);
        parseAndSetData(data);
        calculatePercentages(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (token && userLogged) {
      fetchData();
    } else {
      console.log('Token or userLogged not found');
    }
  }, [token, userLogged]);

  const fetchIndicadores = async (token, userLogged) => {
    try {
      const url = 'https://api3.gps.med.br/API/DadosIndicadores/resultados-indicadores';
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      const body = {
        idPessoaFisica: userLogged,
        indicador: null,
        risco: null,
        dimensao: null,
        dataInicio: null,
        dataFim: null,
        pesquisa: dimen
      };

      const response = await axios.post(url, body, config);
      return response.data;
    } catch (error) {
      console.error('Error fetching indicadores:', error);
      throw error;
    }
  };

  const parseAndSetData = (data) => {
    const parsedData = [];

    if (data && data.length > 0) {
      data.forEach(item => {
        let parsedItem = {
          category: item.tipo,
          logo: item.logo,
          items: []
        };

        try {
          if (item.indicadores) {
            const parsedIndicadores = JSON.parse(item.indicadores);
            parsedItem.items = parsedIndicadores.map(sub => ({
              nome: sub.nome,
              subs: sub.Subs.map(subItem => ({
                nome: subItem.Nome,
                grau: subItem.Grau,
              })),
            }));
          }
        } catch (error) {
          console.error('Error parsing indicadores:', error);
        }

        parsedData.push(parsedItem);
      });
    }

    setCategoriesData(parsedData);
  };

  const calculatePercentages = (data) => {
    let redCount = 0;
    let yellowCount = 0;
    let greenCount = 0;
    let totalCount = 0;

    data.forEach(item => {
      if (item.indicadores) {
        const parsedIndicadores = JSON.parse(item.indicadores);
        parsedIndicadores.forEach(sub => {
          sub.Subs.forEach(subItem => {
            if (subItem.Grau === 3) redCount++;
            else if (subItem.Grau === 2) yellowCount++;
            else if (subItem.Grau === 1) greenCount++;
            totalCount++;
          });
        });
      }
    });

    if (totalCount > 0) {
      setRedPercentage((redCount / totalCount) * 100);
      setYellowPercentage((yellowCount / totalCount) * 100);
      setGreenPercentage((greenCount / totalCount) * 100);
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
          transform={`rotate(${greenAngle + yellowAngle - 90}, 60, 60)`}
        />
      </Svg>
      <View style={styles.iconContainer}>
        {iconName && 
          <Ionicons name={iconName} size={48} color="#ffa500" />
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'white',
  },
  iconContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'transparent',
    top: 35,
  },
});

export default Rings;
