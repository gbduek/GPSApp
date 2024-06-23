import React, { useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Banner from './Components/Banner';
import Rings from './Components/Rings';
import Menu from './Components/Menu';
import SliderGeo from './Components/SliderGeo';
import Header from './Components/Header';
import DataContext from './Context/DataContext';

const HomeScreen = () => {
  const { firstName, percentages, fetchPercentages } = useContext(DataContext); // Accessing firstName and percentages from DataContext

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
    // Fetch percentages on component mount or whenever necessary
    fetchPercentages();
  }, [fetchPercentages]); // Dependency array ensures it runs only when fetchPercentages changes

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

          <TouchableOpacity onPress={handleNavigation('Mente')}>
            <SliderGeo iconName="flame-outline" percentage={percentages.mente} title={"Mente"} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNavigation('LifeStyle')}>
            <SliderGeo iconName="flame-outline" percentage={percentages.lifestyle} title={"Estilo de Vida"} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNavigation('Corpo')}>
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
              <Ionicons name="bar-chart-outline" size={24} color="white" />
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

          <View style={styles.paragraphContainer}>
            <View style={styles.iconBackground}>
              <Ionicons name="book-outline" size={24} color="white" />
            </View>
            <View style={styles.paragraphTextContainer}>
              <Text style={styles.paragraphTitle}>O que você precisa fazer?</Text>
              <Text style={styles.paragraphDescription}>
                Veja as recomendações!
              </Text>
            </View>
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
