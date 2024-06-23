import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import axios from 'axios';
import DataContext from './Context/DataContext';
import Menu from './Components/Menu';

const Recom = () => {
  const { token, userLogged } = useContext(DataContext); // Accessing token and userLogged from context
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!token || !userLogged) {
        console.log('Token or userLogged not found');
        return;
      }

      try {
        const response = await axios.post(
          'https://api3.gps.med.br/API/Recomendacoes',
          {
            user: userLogged, // Using userLogged from context
            indicador: '',
            risco: 3,
            tipo: '',
            filter: ''
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [token, userLogged]); // Ensure useEffect runs when token or userLogged changes

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="orange" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error.message}</Text>
        {error.response && (
          <Text style={styles.errorText}>Details: {JSON.stringify(error.response.data)}</Text>
        )}
      </View>
    );
  }

  // Rendering logic for data
  return (
    <View>
        <Menu/>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Recommendations</Text>
        {data && data.map((item, index) => (
            <View key={index} style={[styles.itemContainer, { borderColor: item.cor }]}>
            <View style={[styles.indicator, { backgroundColor: item.cor }]} />
            <View style={styles.itemContent}>
                <Text style={styles.indicador}>{item.indicador}</Text>
                <Text style={styles.tipo}>{item.tipo}</Text>
                <Text style={styles.grau}>Grau: {item.grau}</Text>
                {item.recomendacoes && item.recomendacoes.map((rec, idx) => (
                <View key={idx} style={styles.recommendation}>
                    <Text style={styles.recommendationText}>{rec.nome}</Text>
                    <Text style={styles.recommendationText}>{rec.recomendacao}</Text>
                </View>
                ))}
            </View>
            </View>
        ))}
        <View style={styles.footer} />
        </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  itemContainer: {
    borderWidth: 2,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
  },
  indicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 16,
  },
  itemContent: {
    flex: 1,
  },
  indicador: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  tipo: {
    fontSize: 14,
    color: '#666',
  },
  grau: {
    fontSize: 14,
    marginVertical: 4,
  },
  recommendation: {
    marginTop: 8,
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 4,
  },
  recommendationText: {
    fontSize: 14,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
  footer: {
    height: 100, // Adjust as needed to enable scrolling
  },
});

export default Recom;
