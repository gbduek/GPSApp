import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import GraphicR from '../Components/GraphicR';
import axios from 'axios';
import DataContext from '../Context/DataContext';

const Registry = ({route, navigation }) => {
  const { type, title, id } = route.params;
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const { token, userLogged } = useContext(DataContext);

  useEffect(() => {
    const fetchData = async () => {
      if (!token || !userLogged) {
        console.log('Token or userLogged not found');
        return;
      }
      try {
        const response = await axios.get(`https://api3.gps.med.br/API/DadosIndicadores/${userLogged}/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setDescription(response.data.Descricao);
        setImageUrl(response.data.Imagem);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id, token, userLogged]);

  const handleNewRecord = () => {
    // Navigate to the Questionary screen with dynamic questions and options
    navigation.navigate('Questionary', { title, id });
  };

  const renderItem = ({ item }) => {
    switch (item.type) {
      case 'header':
        return <Text style={styles.pageTitle}>{type ? `${type} > ${title}` : title}</Text>;
      case 'image':
        return (
          <Image
            source={{ uri: imageUrl || 'https://via.placeholder.com/300' }}
            style={styles.image}
            resizeMode='stretch'
          />
        );
      case 'geometricShape':
        return (
          <View style={styles.geometricShape}>
            <View style={styles.shapeHeader}>
              <Text style={styles.shapeTitle}>{title}</Text>
              <TouchableOpacity style={styles.newRecordButton} onPress={handleNewRecord}>
                <Ionicons name="add" size={30} color="white" />
              </TouchableOpacity>
            </View>
            <Text style={styles.description}>{description}</Text>
            <Text style={styles.message}>Veja abaixo o gráfico do seu último registro!</Text>
            <GraphicR id={id}/>
          </View>
        );
      default:
        return null;
    }
  };

  const data = [
    { id: 'header', type: 'header' },
    { id: 'image', type: 'image' },
    { id: 'geometricShape', type: 'geometricShape' },
  ];

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="orange" />
      </View>
    );
  }

  return (
    <View style={{flex:1}}>
      <View style={styles.container}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.flatListContent}
          ListFooterComponent={<View style={{height:50}}/>}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  flatListContent: {
    padding: 20,
  },
  pageTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 15,
    color: 'orange',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  geometricShape: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  shapeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  shapeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'orange',
  },
  newRecordButton: {
    backgroundColor: 'orange',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  noRecordsText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'gray',
  },
  message: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default Registry;
