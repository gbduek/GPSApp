import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import DataContext from '../../Context/DataContext';
import Menu from '../../Components/Menu';
import Header from '../../Components/Header';
import Popup from '../../Components/Popups/Popup';
import Compass from '../../assets/Icons/Compass';

const colorMap = {
  1: '#4CAF50',  // Grau 1 -> Green
  2: '#FFEB3B', // Grau 2 -> Yellow
  3: '#EF4040',    // Grau 3 -> Red
};

const Recom = () => {
  const { token, userLogged } = useContext(DataContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRec, setSelectedRec] = useState(null);
  const [isPopupVisible, setPopupVisible] = useState(false);

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
            user: userLogged,
            indicador: '',
            risco: 0,
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
  }, [token, userLogged]);

  const showPopup = (rec) => {
    setSelectedRec(rec);
    setPopupVisible(true);
  };

  const hidePopup = () => {
    setPopupVisible(false);
    setSelectedRec(null);
  };

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

  return (
    <View style={{flex:1}}>
      <Header/>
      <View>
        <Menu/>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.title}>Recomendações</Text>
          {data && data.map((item, index) => (
            <View key={index} style={styles.itemContainer}>
              <View style={styles.itemContent}>
                <Text style={styles.indicador}>{item.indicador}</Text>
                <Text style={styles.tipo}>{item.tipo}</Text>
                {item.recomendacoes && item.recomendacoes.map((rec, idx) => (
                  <View key={idx} style={styles.recommendation}>
                    {/* Render Compass icon based on Grau */}
                    <Compass
                      color={colorMap[rec.grau]}
                    />
                    <Text style={styles.recommendationText}>{rec.nome}</Text>
                    {/* Button to show popup */}
                    <TouchableOpacity 
                      style={styles.button} 
                      onPress={() => showPopup(rec)}
                    >
                      <Text style={styles.buttonText}>Detalhes</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>
          ))}
          <View style={styles.footer} />
        </ScrollView>

        {/* Render Popup if visible */}
        <Popup 
          isVisible={isPopupVisible}
          data={selectedRec}
          onClose={hidePopup}
        />
      </View>
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
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: 'orange',
  },
  itemContainer: {
    marginBottom: 16,
    backgroundColor: '#ffff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemContent: {
    flex: 1,
  },
  indicador: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'orange',
  },
  tipo: {
    fontSize: 14,
    color: '#666',
  },
  recommendation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 4,
  },
  recommendationText: {
    fontSize: 14,
    flex: 1,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
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
