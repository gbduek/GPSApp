import React, { useEffect, useState, useContext, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity,
         StyleSheet, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import GraphicR from '../Components/GraphicR';
import axios from 'axios';
import DataContext from '../Context/DataContext';
import GraphEvolutivo from '../Components/GraphEvolutivo';

const Registry = ({ route, navigation }) => {
  const { type, title, id } = route.params;
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const { token, userLogged } = useContext(DataContext);
  const [refreshing, setRefreshing] = useState(false);
  const [exemplos, setExemplos] = useState([]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  }, []);

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

      if(type == 'Corpo'){
        const medidores = response.data.MedidoresForm || [];
        const exemplos = medidores.flatMap(m => 
          m.Medidores.map(med => med.Exemplo)
        );

        setExemplos(exemplos);
      }

      setDescription(response.data.Descricao);
      setImageUrl(response.data.Imagem);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id, token, userLogged])

  useEffect(() => {
    if(refreshing){
      fetchData();
    }
  }, [refreshing])

  const handleNewRecord = () => {
    // Navigate to the Questionary screen with dynamic questions and options
    if(type === 'Corpo'){
      navigation.navigate('Questionary', { type, title, id, examples: exemplos });
    } else {
      navigation.navigate('Questionary', { type, title, id });
    }
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
          <View>
            <View style={styles.geometricShape}>
              <View style={styles.shapeHeader}>
                <Text style={styles.shapeTitle}>{title}</Text>
                {id !== '5bdefa56-4559-4d9a-b550-c29599fcb4aa' && (
                  <TouchableOpacity style={styles.newRecordButton} onPress={handleNewRecord}>
                    <Ionicons name="add" size={30} color="white" />
                  </TouchableOpacity>
                )}
              </View>
              <Text style={styles.description}>{description}</Text>
              <Text style={styles.message}>Veja abaixo o gráfico do seu último registro!</Text>
              <GraphicR id={id} refreshing={refreshing} />
            </View>
            <View style={[styles.geometricShape, {marginTop: 20}]}>
              <Text style={styles.shapeTitle}>Gráfico Evolutivo</Text>
              <GraphEvolutivo id={id} refreshing={refreshing}/>
            </View>
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
          refreshControl={
            <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor="orange"
            />
        }
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
