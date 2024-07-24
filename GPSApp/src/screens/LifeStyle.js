import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import axios from 'axios';
import DataContext from '../../Context/DataContext';
import Header from '../../Components/Header';

const LifeStyle = ({ navigation }) => {
  const { percentages, loading, fetchPercentages, token, userLogged } = useContext(DataContext);
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!token || !userLogged) {
          throw new Error('Token or userLogged not found');
        }

        fetchPercentages(); // Fetch percentages from context

        const indicatorId = '7ed63315-ff7b-4658-b488-7655487e2845';
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
    { id: 'e32afaa7-f67c-435b-b54b-30ec4a1bb238', type: 'Estilo de Vida', title: 'Tabagismo' },
    { id: '6cebc1b7-8629-4b3f-9e34-262eb0a0559a', type: 'Estilo de Vida', title: 'Qualidade de Vida' },
    { id: '9c82c3c0-e801-49ef-8659-524596dbef5f', type: 'Estilo de Vida', title: 'Mudança de Comportamento' },
    { id: '22fc17f4-9e04-4b16-abbd-7e3a0fc980bb', type: 'Estilo de Vida', title: 'Prevenção de Acidentes' },
    { id: 'cfba6c35-391d-4c4e-ba1b-8d3bda151fba', type: 'Estilo de Vida', title: 'Doenças Crônicas' },
    { id: '4ebdaf1b-f3e2-4a7e-a001-28c36036aafa', type: 'Estilo de Vida', title: 'Exames Preventivos' },
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
          <FontAwesome5 style={{ paddingRight: 10 }} name="running" size={28} color="orange" />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Estilo de Vida</Text>
            {loading ? (
              <Text>Loading...</Text>
            ) : (
              <Text style={styles.percentage}>{percentages.lifestyle}%</Text>
            )}
          </View>
        </View>
        <Image
          source={{ uri: 'https://api3.gps.med.br/api/upload/image?vinculo=7ed63315-ff7b-4658-b488-7655487e2845' }}
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
    paddingHorizontal: 15,
    paddingTop: 15,
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

export default LifeStyle;
