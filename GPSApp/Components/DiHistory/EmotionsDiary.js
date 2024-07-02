import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Image } from 'react-native';
import axios from 'axios';
import DataContext from '../../Context/DataContext';

const EmotionsDiary = () => {
  const { token, userLogged } = useContext(DataContext);
  const [diaryEntries, setDiaryEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDiaryEntries = async () => {
      try {
        const response = await axios.post(
          'https://api3.gps.med.br/API/diario/diarios',
          {
            pessoa: userLogged,
            tipoDiario: 'a8772285-cc12-47c0-b947-eeac0a790b7a',
            dadoTipoDiario: null,
            dataInicio: null,
            dataFinal: null,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const entries = response.data.slice(0, 5); // Get the latest 5 entries
        setDiaryEntries(entries);
      } catch (error) {
        console.error('Error fetching diary entries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDiaryEntries();
  }, [token, userLogged]);

  const renderDiaryEntry = ({ item }) => {
    const emotionImages = {
      Medo: require('../../assets/emotions/scared.png'),
      Ansiedade: require('../../assets/emotions/anxious.png'),
      Alegria: require('../../assets/emotions/happy.png'),
      Tristeza: require('../../assets/emotions/sad.png'),
      Nojo: require('../../assets/emotions/disgust.png'),
      Raiva: require('../../assets/emotions/angry.png'),
    };

    return (
      <View style={styles.entryContainer}>
        <Image source={emotionImages[item.emocao.nome]} style={styles.emotionImage} />
        <View style={styles.entryDetails}>
          <Text style={styles.entryDate}>{new Date(item.inicio).toLocaleString()}</Text>
          <Text style={styles.entryTitle}>{item.emocao.nome}</Text>
          <Text style={styles.entryParagraph}>Intensidade: {item.intensidade}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="orange" />
      ) : (
        <FlatList
          data={diaryEntries}
          renderItem={renderDiaryEntry}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  listContent: {
    paddingBottom: 20,
  },
  entryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  emotionImage: {
    width: 30,
    height: 29,
    borderRadius: 25,
    marginRight: 10,
  },
  entryDetails: {
    flex: 1,
  },
  entryDate: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  entryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'orange',
    marginBottom: 5,
  },
  entryParagraph: {
    fontSize: 16,
  },
});

export default EmotionsDiary;
