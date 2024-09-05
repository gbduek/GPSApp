import React, { useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Banner from '../../Components/Banner';
import Rings from '../../Components/Rings'
import SliderGeo from '../../Components/SliderGeo';
import Header from '../../Components/Header';
import DataContext from '../../Context/DataContext';
import NotebookIcon from '../../assets/Icons/NotebookIcon';

const HomeScreen = () => {
  const { firstName, percentages, fetchPercentages, temDiario, userCompany } = useContext(DataContext);

  const cedaeIds = [
    "74ec66e6-87a4-3e6c-9ab2-55b3d91772a7",
    "f7eef769-4739-fa45-834a-a2827c24d234",
    "de12a610-8e5e-525e-3661-d19a33168e29",
    "650b0e12-4361-6eee-9588-e8bbcacab0cef"
  ];

  const bannerImages = cedaeIds.includes(userCompany)
    ? [
        require('../../assets/Banners/cedae/banner_cedae.png'),
        require('../../assets/Banners/cedae/banner_cedae_equilibrio.png'),
      ]
    : [
        require('../../assets/Banners/generic/banner_generic.png'),
        require('../../assets/Banners/generic/banner_generic2.png'),
        require('../../assets/Banners/generic/banner_generic3.png')
      ];

  const renderLogo = (logoUrl) => {
    let additionalStyle = {};
    if (logoUrl.includes('Mente')) {
      return <MaterialCommunityIcons style={styles.iconContainer} name="head-lightbulb-outline" size={45} color="orange" />;
    } else if (logoUrl.includes('Estilo de Vida')) {
      additionalStyle = { left: 41, top: 177 };
      return <FontAwesome5 style={[styles.iconContainer, additionalStyle]} name="running" size={45} color="orange" />;
    } else if (logoUrl.includes('Corpo')) {
      additionalStyle = { left: 37.5, top: 320 };
      return <Ionicons style={[styles.iconContainer, additionalStyle]} name="body" size={45} color="orange" />;
    } else {
      return null;
    }
  };

  const navigation = useNavigation();

  const handleNavigation = (screen, data) => () => {
    navigation.navigate(screen, data);
  };

  useEffect(() => {
    // Fetch percentages on component mount or whenever necessary
    fetchPercentages();
  }, [fetchPercentages]);

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <ScrollView contentContainerStyle={styles.scrollViewContent} horizontal={false}>
          <Text style={styles.greetingText}>Olá, {firstName}</Text>

          <View style={{paddingHorizontal: 15}}>
            <Banner images={bannerImages} />
          </View>

          <Text style={styles.heading}>
            Como está sua saúde e qualidade de vida?
          </Text>
          <Text style={styles.paragraph}>
            Veja os percentuais de preenchimento da sua GPS MED!
          </Text>

          <TouchableOpacity onPress={handleNavigation('Mente')}>
            <SliderGeo iconName="head-lightbulb-outline" percentage={percentages.mente} title={"Mente"} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNavigation('Estilo de Vida')}>
            <SliderGeo iconName="running" percentage={percentages.lifestyle} title={"Estilo de Vida"} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNavigation('Corpo')}>
            <SliderGeo iconName="body" percentage={percentages.corpo} title={"Corpo"} />
          </TouchableOpacity>

          <View style={styles.paragraphContainer}>
            <View style={styles.iconBackground}>
              <TouchableOpacity onPress={handleNavigation('Diários')}>
                <Ionicons name="book-outline" size={24} color="white" />
              </TouchableOpacity>
            </View>
            <View style={styles.paragraphTextContainer}>
              <Text style={styles.paragraphTitle}>Como você está hoje?</Text>
              <Text style={styles.paragraphDescription}>
                Registrando no diário, você poderá aumentar seu autoconhecimento e ter acesso ao seu histórico ao longo do tempo.
              </Text>
            </View>
          </View>

          {temDiario ? 
            <View>
              <NotebookIcon/>
            </View>
            :(
            <View style={styles.ribbonContainer}>
              <Text style={styles.ribbonText}>Você ainda não registrou nenhum diário</Text>
            </View>
            )
          }

          <View style={styles.paragraphContainer}>
            <View style={styles.iconBackground}>
              <TouchableOpacity onPress={handleNavigation('Perfil de Saúde')}>
                <Ionicons name="bar-chart-outline" size={24} color="white" />
              </TouchableOpacity>
            </View>
            <View style={styles.paragraphTextContainer}>
              <Text style={styles.paragraphTitle}>Quer saber o que pode melhorar em sua saúde?</Text>
              <Text style={styles.paragraphDescription}>
                Acompanhe seu perfil de saúde e veja o que deve priorizar!
              </Text>
            </View>
          </View>

          <View style={styles.ringsContainer}>
            <Rings dimen={'Mente'} />
            {renderLogo('Mente')}
            <Rings dimen={'Estilo de Vida'}/>
            {renderLogo('Estilo de Vida')}
            <Rings dimen={'Corpo'} />
            {renderLogo('Corpo')}
          </View>

          <View style={[styles.paragraphContainer,
             {
              backgroundColor:'rgba(255, 165, 0, 0.2)', padding:10, borderColor:'orange', borderWidth: 1
             }]}>
            <View style={styles.iconBackground}>
              <TouchableOpacity onPress={handleNavigation('Recomendações')}>
                <Ionicons name="bulb-outline" size={24} color="white" />
              </TouchableOpacity>
            </View>
            <View style={styles.paragraphTextContainer}>
              <Text style={[styles.paragraphTitle, {marginTop: 10}]}>O que você precisa fazer?</Text>
              <Text style={[styles.paragraphDescription, {marginBottom: 10}]}>
                Veja as recomendações!
              </Text>
            </View>
          </View>

          {/*This is a small blank paragraph to make the scroll view go all the way down*/}
          <View style={{height: 150}}/>
          {/*This is a small blank paragraph to make the scroll view go all the way down*/}
        </ScrollView>
      </View>
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
    marginTop: 0,
  },
  scrollViewContent: {
    alignItems: 'center',
    width: '100%',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 30,
    textAlign: 'center',
    color: 'orange',
    fontFamily: 'Gontserrat-700',
    paddingHorizontal: 15,
  },
  paragraph: {
    textAlign: 'center',
    color: '#504b4b',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 1,
    paddingHorizontal: 15
  },
  greetingText: {
    position: 'absolute',
    top: 5,
    left: 0,
    fontWeight: 'bold',
    color: 'orange',
    fontSize: 22,
    paddingHorizontal: 15,
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
    fontSize: 22,
    fontWeight: 'bold',
    color: '#504b4b',
    marginBottom: 5,
  },
  paragraphDescription: {
    fontSize: 18,
    color: '#7b7b7b',
    fontFamily: 'Arial'
  },
  ribbonContainer: {
    marginTop: 10,
    backgroundColor: '#ffcccc',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  ribbonContainerOk: {
    marginTop: 10,
    backgroundColor: 'green',
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
  iconContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'transparent',
    top: 35,
    left: 36
  }
});

export default HomeScreen;
