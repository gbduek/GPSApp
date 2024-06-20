import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Banner from './Components/Banner';
import Rings from './Components/Rings';
import Menu from './Components/Menu';
import SliderGeo from './Components/SliderGeo';
import Header from './Components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const HomeScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [percentages, setPercentages] = useState({ mente: 0, lifestyle: 0, corpo: 0 });
  const bannerImages = [
    require('./assets/banner.png'),
    require('./assets/banner2.png'),
    require('./assets/banner3.png'),
  ];

  const navigation = useNavigation();

  const handleNavigation = (screen, data) => () => {
    navigation.navigate(screen, data);
  };

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const name = await AsyncStorage.getItem('userLoggedName');
        if (name) {
          const firstName = name.split(' ')[0].toUpperCase();
          setFirstName(firstName);
        }
      } catch (error) {
        console.log('Failed to fetch user name from AsyncStorage:', error);
      }
    };

    fetchUserName();
  }, []);

  useEffect(() => {
    const fetchPercentages = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        const storedUserLogged = await AsyncStorage.getItem('userLogged');
        if (!storedToken || !storedUserLogged) {
          throw new Error('Token or userLogged not found');
        }

        const config = {
          headers: {
            Authorization: `Bearer ${storedToken}`
          }
        };

        const indicatorIds = {
          mente: '40c6eaad-8815-4cbc-9caf-78f081f03674',
          lifestyle: '7ed63315-ff7b-4658-b488-7655487e2845',
          corpo: '20118275-8791-469e-b9f5-3210f990dd01'
        };

        const responses = await Promise.all(Object.values(indicatorIds).map(indicatorId =>
          axios.get(`https://api3.gps.med.br/API/DadosIndicadores/tipo-indicadores-porcetagem-preenchimento/${storedUserLogged}/${indicatorId}`, config)
        ));

        const preenchidos = responses.map(response => response.data.preenchidos);

        // Adjust maximum values for each category
        const maxValues = {
          mente: 6,
          lifestyle: 10,
          corpo: 12,
        };

        const calculatedPercentages = {
          mente: Math.round((preenchidos[0] / maxValues.mente) * 100),
          lifestyle: Math.round((preenchidos[1] / maxValues.lifestyle) * 100),
          corpo: Math.round((preenchidos[2] / maxValues.corpo) * 100),
        };

        setPercentages(calculatedPercentages);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPercentages();
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <ScrollView contentContainerStyle={styles.scrollViewContent} horizontal={false}>
          <Text style={styles.greetingText}>Olá, {firstName}</Text>
          <Banner images={bannerImages} />

          <Text style={styles.heading}>
            Veja os percentuais de preenchimento do seu GPS MED!
          </Text>
          <Text style={styles.paragraph}>
            Que tal clicar em uma das dimensões para ver em detalhes?
          </Text>

          <TouchableOpacity onPress={handleNavigation('Mente', { percentage: percentages.mente })}>
            <SliderGeo iconName="flame-outline" percentage={percentages.mente} title={"Mente"} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNavigation('LifeStyle', { percentage: percentages.lifestyle })}>
            <SliderGeo iconName="flame-outline" percentage={percentages.lifestyle} title={"Estilo de Vida"} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNavigation('Corpo', { percentage: percentages.corpo })}>
            <SliderGeo iconName="body-outline" percentage={percentages.corpo} title={"Corpo"} />
          </TouchableOpacity>

          <View style={styles.paragraphContainer}>
            <View style={styles.iconBackground}>
              <Ionicons name="book-outline" size={24} color="white" />
            </View>
            <View style={styles.paragraphTextContainer}>
              <Text style={styles.paragraphTitle}>Como você está hoje?</Text>
              <Text style={styles.paragraphDescription}>
                Registrando no diário, você poderá aumentar seu autoconhecimento e ter acesso ao seu histórico ao longo do tempo.
              </Text>
            </View>
          </View>
          <View style={styles.ribbonContainer}>
            <Text style={styles.ribbonText}>Você ainda não registrou nenhum diário</Text>
          </View>

          <View style={styles.paragraphContainer}>
            <View style={styles.iconBackground}>
              <Ionicons name="book-outline" size={24} color="white" />
            </View>
            <View style={styles.paragraphTextContainer}>
              <Text style={styles.paragraphTitle}>Quer saber o que pode melhorar em sua saúde?</Text>
              <Text style={styles.paragraphDescription}>
                Acompanhe seu perfil de saúde e veja o que deve priorizar!
              </Text>
            </View>
          </View>

          <View style={styles.ringsContainer}>
            <Rings iconName="walk" />
            <Rings iconName="walk" />
            <Rings iconName="accessibility" />
          </View>
        </ScrollView>
      </View>
      <Menu />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginTop: 0,
  },
  scrollViewContent: {
    alignItems: 'center',
    width: '100%',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 40,
    textAlign: 'center',
    color: '#504b4b',
    fontFamily: 'Gontserrat-700',
  },
  paragraph: {
    fontSize: 16,
    textAlign: 'center',
    color: 'orange',
    fontWeight: 'bold',
    fontSize: 22,
    letterSpacing: 1,
    fontFamily: 'Gontserrat-700',
  },
  greetingText: {
    position: 'absolute',
    top: 5,
    left: 0,
    fontWeight: 'bold',
    color: 'orange',
    fontSize: 22,
    fontFamily: 'Gontserrat-700',
  },
  ringsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    top: 50,
  },
  paragraphContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 70,
    paddingHorizontal: 15,
    width: '100%',
  },
  iconBackground: {
    backgroundColor: 'orange',
    borderRadius: 24,
    padding: 12,
  },
  paragraphTextContainer: {
    marginLeft: 10,
    flex: 1,
  },
  paragraphTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    fontFamily: 'Gontserrat-700',
  },
  paragraphDescription: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'Gontserrat-500',
  },
  ribbonContainer: {
    marginTop: 10,
    backgroundColor: '#ffcccc',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  ribbonText: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HomeScreen;
