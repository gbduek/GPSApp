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

const HomeScreen = () => {
  const [firstName, setFirstName] = useState('');
  const bannerImages = [
    require('./assets/banner.png'),
    require('./assets/banner2.png'),
    require('./assets/banner3.png'),
  ];

  const navigation = useNavigation();

  const handleNavigation = (screen) => () => {
    navigation.navigate(screen);
  };


  {/* Try/catch for getting the name of the user to display on the greeting text*/}
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

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        {/* Scrollable Area */}
        <ScrollView contentContainerStyle={styles.scrollViewContent} horizontal={false}>
          <Text style={styles.greetingText}>Olá, {firstName}</Text>
          <Banner images={bannerImages} />

          <Text style={styles.heading}>
            Veja os percentuais de preenchimento do seu GPS MED!
          </Text>
          <Text style={styles.paragraph}>
            Que tal clicar em uma das dimensões para ver em detalhes?
          </Text>

          {/* Slider Buttons w/percentage */}
          <TouchableOpacity onPress={handleNavigation('Mente')}>
            <SliderGeo iconName="flame-outline" percentage={50} title={"Mente"} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNavigation('LifeStyle')}>
            <SliderGeo iconName="flame-outline" percentage={100} title={"Estilo de Vida"} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNavigation('Corpo')}>
            <SliderGeo iconName="body-outline" percentage={20} title={"Corpo"} />
          </TouchableOpacity>

          {/* New Paragraph and Ribbon */}
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

          {/* New Paragraph and Ribbon */}
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

          {/* Rings */}
          <View style={styles.ringsContainer}>
            <Rings iconName="walk" />
            <Rings iconName="walk" />
            <Rings iconName="accessibility" />
          </View>
        </ScrollView>
        {/* End of Scrollable Area */}
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
    paddingHorizontal: 15, // Adjusted padding
    marginTop: 0,
  },
  scrollViewContent: {
    alignItems: 'center', // Center items horizontally
    width: '100%', // Ensure the content does not overflow horizontally
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
    fontWeight: 'bold', // Set text to bold
    color: 'orange', // Set text color to orange
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
    marginTop: 70, // Added margin for spacing
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
    alignItems: 'center', // Center the text horizontally
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
