import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import Menu from './Components/Menu';
import axios from 'axios';
import DataContext from './Context/DataContext';

const Mente = ({ navigation }) => {
  const { percentages, loading, fetchPercentages, token, userLogged } = useContext(DataContext);
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!token || !userLogged) {
          throw new Error('Token or userLogged not found');
        }

        fetchPercentages();

        const indicatorId = '40c6eaad-8815-4cbc-9caf-78f081f03674';
        const response = await axios.get(`https://api3.gps.med.br/API/DadosIndicadores/tipo-indicadores-porcetagem-preenchimento/${userLogged}/${indicatorId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setApiData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const data = [
    { id: '8a47e739-e198-44e4-9445-594a847b4fdb', nome: 'Estresse' },
    { id: 'b2374168-b92a-4ef9-a7ef-0cfdea386d95', nome: 'Ansiedade e Humor' },
    { id: '060a70ed-1d00-4005-b9ad-1e20686416eb', nome: 'Estresse Ocupacional' },
    { id: '8dc55e39-59ed-48de-9f43-084425355452', nome: 'Resiliencia' },
    { id: '3433fe55-0abd-4373-b9f8-f7144aca3257', nome: 'Espiritualidade' },
    { id: '5c4120a7-6f48-47fd-8a54-aac1018d474f', nome: 'Inteligencia Emocional' },
  ];

  const handleFormOpen = (item) => {
    navigation.navigate('Registry', { title: item.nome, id: item.id });
  };

  const SubComponent = ({ title, onPress }) => (
    <View style={styles.subComponent}>
      <Text style={styles.subComponentTitle}>{title}</Text>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.iconContainer}>
          <Ionicons name="arrow-forward" size={24} color="white" />
        </View>
      </TouchableOpacity>
    </View>
  );

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
          <SubComponent title={item.nome} onPress={() => handleFormOpen(item)} />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListFooterComponent={() => <View style={styles.footer} />}
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
    height: 240,
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
