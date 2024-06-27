import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import axios from 'axios';
import DataContext from './Context/DataContext';

const PdS = () => {
  const { token, userLogged } = useContext(DataContext);
  const [loading, setLoading] = useState(true);
  const [indicadoresData, setIndicadoresData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch indicadores data
        const data = await fetchIndicadores(token, userLogged);
        setIndicadoresData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
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
        pesquisa: null
      };

      const response = await axios.post(url, body, config);
      return response.data;
    } catch (error) {
      console.error('Error fetching indicadores:', error);
      throw error;
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#FFA500" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {indicadoresData ? (
        <View style={styles.dataContainer}>
          <Section title="Indicadores Data" data={indicadoresData} />
          {/* Add more sections as needed */}
        </View>
      ) : (
        <Text style={styles.text}>No data available</Text>
      )}
    </ScrollView>
  );
};

const Section = ({ title, data }) => (
  <View style={styles.sectionContainer}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.sectionContent}>
      {/* Render your data here based on the structure of indicadoresData */}
      <Text style={styles.sectionText}>Example Data: {JSON.stringify(data)}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFF', // Set your desired background color
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  dataContainer: {
    marginBottom: 20,
  },
  sectionContainer: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FFA500', // Orange color
  },
  sectionContent: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default PdS;
