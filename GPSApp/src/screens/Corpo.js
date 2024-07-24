import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Menu from '../../Components/Menu';
import axios from 'axios';
import DataContext from '../../Context/DataContext';
import Header from '../../Components/Header';

const Corpo = ({ navigation }) => {
  const { percentages, loading, fetchPercentages, token, userLogged } = useContext(DataContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!token || !userLogged) {
          throw new Error('Token or userLogged not found');
        }

        fetchPercentages(); // Fetch percentages from context

        const indicatorId = '20118275-8791-469e-b9f5-3210f990dd01';
        const response = await axios.get(`https://api3.gps.med.br/API/DadosIndicadores/tipo-indicadores-porcetagem-preenchimento/${userLogged}/${indicatorId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const data = [
    { id: 'bd7e7f0d-280d-49dd-b840-16162c74160e', type: 'Corpo', title: 'Pressão Arterial' },
    { id: '04870942-8621-45e4-a781-d1f58f99ecd1', type: 'Corpo', title: 'Peso e Altura' },
    { id: '4e23b8dc-fbab-4e3c-a849-e2e6601e332c', type: 'Corpo', title: 'Circunferência Abdominal' },
    { id: 'f60c4af7-21eb-4eeb-b5d2-cd37817d2c6c', type: 'Corpo', title: 'Hemoglobina' },
    { id: 'c879f3dc-3aee-492b-8254-8239be0399c0', type: 'Corpo', title: 'Plaquetas' },
    { id: 'd7d7260d-d248-4a85-abab-375895d336e0', type: 'Corpo', title: 'Glicose' },
  ];

  const handleFormOpen = (item) => {
    navigation.navigate('Registry', { title: item.title, id: item.id, type: item.type });
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
    <View style={{flex:1}}>
      <Header/>
      <View style={styles.container}>
        <View style={styles.header}>
          <Ionicons style={{ paddingRight: 5 }} name="body" size={28} color="orange" />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Corpo</Text>
            {loading ? (
              <Text>Loading...</Text>
            ) : (
              <Text style={styles.percentage}>{percentages.corpo}%</Text>
            )}
          </View>
        </View>
        <Image
          source={{ uri: 'https://api3.gps.med.br/api/upload/image?vinculo=20118275-8791-469e-b9f5-3210f990dd01' }}
          style={styles.image}
        />
        <FlatList
          scrollIndicatorInsets={{right: 1}}
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <SubComponent title={item.title} onPress={() => handleFormOpen(item)} />
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListFooterComponent={() => <View style={styles.footer} />}
        />
      </View>
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
    paddingHorizontal: 10,
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

export default Corpo;
