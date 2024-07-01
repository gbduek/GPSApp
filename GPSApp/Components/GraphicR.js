import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import DataContext from '../Context/DataContext';

const GraphicR = ({ id }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token, userLogged } = useContext(DataContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api3.gps.med.br/API/DadosIndicadores/page-data/${userLogged}/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const apiData = response.data.GraficoEvolutivo.map(item => ({
          date: new Date(item.UltimaMedicaoData).toLocaleDateString('en-US', {
            year: '2-digit',
            month: '2-digit',
          }),
          value: item.UltimaMedicao,
          color: item.CorExibicao,
          nome: item.Nome,
        }));
        setData(apiData);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, token, userLogged]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#FFA500" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* These are the vertical numbers on the left of the graphic */}
      <View style={styles.yAxis}>
        {[100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 0].map((value) => (
          <Text key={value} style={styles.yAxisText}>{value}</Text>
        ))}
      </View>
      <View style={styles.graph}>
        {data.map((data, index) => (
          <View key={index} style={styles.barContainer}>
            <View
              style={[
                styles.bar,
                {
                  height: `${Math.min(data.value, 100)}%`,
                  backgroundColor: data.color,
                },
              ]}
            />
            <Text style={styles.dateText}>{data.date}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 20,
    marginBottom: 20,
  },
  yAxis: {
    justifyContent: 'space-between',
    height: 200,
  },
  yAxisText: {
    fontSize: 14,
    textAlign: 'right',
  },
  graph: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 200,
    width: '100%',
    top: 20,
  },
  barContainer: {
    flex: 1,
    alignItems: 'center',
  },
  bar: {
    width: 20,
    borderRadius: 10,
  },
  dateText: {
    marginTop: 5,
    fontSize: 12,
  },
});

export default GraphicR;
