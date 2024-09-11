import React, { useEffect, useContext, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { fetchMenuData } from '../../../Services/homeApi';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Rings from '../../../Components/Rings'
import Header from '../../../Components/Header';
import DataContext from '../../../Context/DataContext';
import NotebookIcon from '../../../assets/Icons/NotebookIcon';
import styles from './styles';
import GreetingSection from './GreetingSection';
import BannerSection from './BannerSection';
import SliderSection from './SliderSection';

const HomeScreen = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const { firstName,
          percentages,
          fetchPercentages,
          temDiario,
          userCompany,
          userLogged,
          token
  } = useContext(DataContext);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const fetchedData = await fetchMenuData(userLogged, token);
        setData(fetchedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (token && userLogged) {
      fetchData();
    }
  }, [userLogged]);

  useEffect(() => {
    fetchPercentages();
  }, [fetchPercentages]);

  const mapDimens = () => {
    data.map((item) => {
      console.log('ID:', item.id);
      console.log('Logo:', item.logo);
      console.log('Ordem:', item.ordem);
      console.log('Sigla:', item.sigla);
      console.log('Permission:', item.temPermissao);
    });
  }

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


  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#FFA500" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <ScrollView contentContainerStyle={styles.scrollViewContent} horizontal={false}>
          <GreetingSection firstName={firstName} />

          <BannerSection userCompany={userCompany} />

          <SliderSection percentages={percentages} navigation={navigation} menuData={data} />

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

export default HomeScreen;
