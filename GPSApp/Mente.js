import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import Menu from './Components/Menu';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DataContext from './Context/DataContext'

const Mente = ({ navigation }) => {
  const { percentages, loading } = useContext(DataContext); // Access percentages and loading from DataContext
  const [apiData, setApiData] = useState(null); // State to store API data
  const [userLogged, setUserLogged] = useState(null); // State to store userLogged


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Retrieve token and userLogged from AsyncStorage
        const storedToken = await AsyncStorage.getItem('token');
        const storedUserLogged = await AsyncStorage.getItem('userLogged');

        if (!storedToken || !storedUserLogged) {
          throw new Error('Token or userLogged not found');
        }

        setUserLogged(storedUserLogged); // Store the userLogged in state

        // Specific indicator ID
        const indicatorId = '40c6eaad-8815-4cbc-9caf-78f081f03674';

        // Set up axios request with Authorization header
        const config = {
          headers: {
            Authorization: `Bearer ${storedToken}`
          }
        };

        // Make GET request to API endpoint with specific indicator ID
        const apiUrl = `https://api3.gps.med.br/API/DadosIndicadores/tipo-indicadores-porcetagem-preenchimento/${storedUserLogged}/${indicatorId}`;

        const response = await axios.get(apiUrl, config);

        //console.log('API Data:', response.data);
        setApiData(response.data); // Store the data in state if needed

      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error as needed
      }
    };

    fetchData();
  }, []);

  // Data for sub-components (keep this as it is)
  const data = [
    {
      id: '1',
      title: 'Estresse',
      description: [
        "Estresse é uma reação de defesa e adaptação para dar mais energia em momentos de ameaça.",
        "Esta avaliação mede o nível de estresse e a fonte dos fatores estressores."
      ].join(' ')
    },
    {
      id: '2',
      title: 'Ansiedade e Humor',
      description: [
        "Ansiedade manifesta-se por inquietação, dificuldade de concentração e somatização.",
        "Depressão com tristeza, diminuição do prazer pela vida e falta de energia."
      ].join(' ')
    },
    {
      id: '3',
      title: 'Estresse Ocupacional',
      description: [
        "O trabalho pode ser uma fonte de estresse e de realização. Uma das fontes mais comuns",
        "de fatores estressores é o ambiente de trabalho. Através de questionário, você saberá seu nível de estresse ocupacional."
      ].join(' ')
    },
    {
      id: '4',
      title: 'Resiliencia',
      description: [
        "A resiliência é a capacidade de suportar as adversidades, mantendo o máximo de equilíbrio,",
        "sendo um importante fator protetor contra o estresse e as doenças. Ela é composta pela ",
        "flexibilidade, otimismo, necessidade atendidas, suporte social e sensação de sentido ou propósito."
      ].join(' ')
    },
    {
      id: '5',
      title: 'Espiritualidade',
      description: [
        "Description for Espiritualidade.",
        "Explore the role of spirituality in mental well-being.",
        "Include diverse perspectives and practices."
      ].join(' ')
    },
    {
      id: '6',
      title: 'Inteligencia Emocional',
      description: [
        "Description for Inteligencia Emocional.",
        "Define emotional intelligence and its components.",
        "Highlight its significance in personal and professional growth."
      ].join(' ')
    },
  ];

  // Function to handle form opening (keep this as it is)
  const handleFormOpen = (item) => {
    navigation.navigate('RegistryMind', { title: item.title, description: item.description });
  };

  // Sub Component (keep this as it is)
  const SubComponent = ({ title, onPress }) => {
    return (
      <View style={styles.subComponent}>
        <Text style={styles.subComponentTitle}>{title}</Text>
        {/* Button to open form */}
        <TouchableOpacity onPress={onPress}>
          <View style={styles.iconContainer}>
            <Ionicons name="arrow-forward" size={24} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Menu />
      <View style={styles.header}>
        <MaterialCommunityIcons style={{ paddingRight: 5 }} name="head-lightbulb-outline" size={28} color="orange" />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Mente</Text>
          {loading ? (
            <Text>Loading...</Text>
          ) : (
            <Text style={styles.percentage}>{percentages.mente}%</Text>
          )}
        </View>
      </View>
      <Image
        source={{ uri: 'https://api3.gps.med.br/api/upload/image?vinculo=40c6eaad-8815-4cbc-9caf-78f081f03674' }}
        style={styles.image}
      />
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SubComponent title={item.title} onPress={() => handleFormOpen(item)} />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListFooterComponent={() => (
          <View style={styles.footer}>
            {/* Empty View to keep the footer at the bottom */}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    color: 'orange',
  },
  percentage: {
    fontSize: 20,
    color: 'orange',
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 250,
    marginBottom: 15,
  },
  subComponent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  subComponentTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  separator: {
    height: 1,
    backgroundColor: 'gray',
    marginVertical: 8,
  },
  footer: {
    flex: 1,
  },
  iconContainer: {
    backgroundColor: 'orange',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Mente;
