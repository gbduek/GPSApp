import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Banner from './Components/Banner';
import Rings from './Components/Rings';
import Menu from './Components/Menu';
import SliderGeo from './Components/SliderGeo';

const HomeScreen = () => {
  const bannerImages = [
    require('./assets/banner.png'),
    require('./assets/banner2.png'),
    require('./assets/banner3.png'),
  ];

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Scrollable Area */}
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <Text style={styles.greetingText}>Olá, GABRIEL</Text>
          <Banner images={bannerImages} />

          <Text style={styles.heading}>
            Veja os percentuais de preenchimento do seu GPS MED!
          </Text>
          <Text style={styles.paragraph}>
            Que tal clicar em uma das dimensões para ver em detalhes?
          </Text>

          {/* Slider Buttons w/percentage */}
          <TouchableOpacity>
            <SliderGeo iconName="flame-outline" percentage={20} title={"Mente"}/>
          </TouchableOpacity>
          <TouchableOpacity>
            <SliderGeo iconName="flame-outline" percentage={100} title={"Estilo de Vida"}/>
          </TouchableOpacity>
          <TouchableOpacity>
            <SliderGeo iconName="flame-outline" percentage={75} title={"Corpo"}/>
          </TouchableOpacity>

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
  },
  scrollViewContent: {
    alignItems: 'center', // Center items horizontally
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
});

export default HomeScreen;
