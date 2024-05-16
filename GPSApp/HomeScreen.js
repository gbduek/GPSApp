import React, { useState } from 'react';
import { View, Text, StyleSheet, Animated, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Banner from './Components/Banner';
import Rings from './Components/Rings';
import Menu from './Components/Menu';

const HomeScreen = () => {
  const navigation = useNavigation();

  const bannerImages = [
    require('./assets/banner.png'),
    require('./assets/banner2.png'),
    require('./assets/banner3.png'),
  ];


  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Scrollable Area */}
        <ScrollView>
          <View style={styles.content}>
            <Text style={styles.greetingText}>Olá, AMANDA</Text>
            <Banner images={bannerImages}/>

            <Text style={styles.heading}>
              Veja os percentuais de preenchimento do seu GPS MED!
            </Text>
            <Text style={styles.paragraph}>
              Que tal clicar em uma das dimensoes para ver em detalhes?
            </Text>

            {/* Rings */}
            <View style={styles.ringsContainer}>
              {/* Other content */}
              <Rings iconName="walk"/>
              <Rings iconName="walk"/>
              <Rings iconName="accessibility"/>
              {/* Other content */}
            </View>

            {/* Add more content here */}
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
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
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
