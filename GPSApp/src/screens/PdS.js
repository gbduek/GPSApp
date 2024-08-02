import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import axios from 'axios';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DataContext from '../../Context/DataContext';
import Compass from '../../assets/Icons/Compass';
import Header from '../../Components/Header';
import Rings from '../../Components/Rings';

const PdS = () => {
  const { token, userLogged } = useContext(DataContext);
  const [loading, setLoading] = useState(true);
  const [categoriesData, setCategoriesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchIndicadores(token, userLogged);
        parseAndSetData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (token && userLogged) {
      fetchData();
    } else {
      console.log('Token or userLogged not found');
    }
  }, [token, userLogged]);

  const fetchIndicadores = async (token, userLogged) => {
    try {
      const url = 'https://api3.gps.med.br/API/DadosIndicadores/resultados-indicadores';
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      const body = {
        idPessoaFisica: userLogged,
        indicador: null,
        risco: null,
        dimensao: null,
        dataInicio: null,
        dataFim: null,
        pesquisa: null
      };

      const response = await axios.post(url, body, config);
      return response.data;
    } catch (error) {
      console.error('Error fetching indicadores:', error);
      throw error;
    }
  };

  const parseAndSetData = (data) => {
    const parsedData = [];

    if (data && data.length > 0) {
      data.forEach(item => {
        let parsedItem = {
          category: item.tipo,
          logo: item.logo,
          items: []
        };

        try {
          if (item.indicadores) {
            const parsedIndicadores = JSON.parse(item.indicadores);
            parsedItem.items = parsedIndicadores.map(sub => ({
              nome: sub.nome,
              subs: sub.Subs.map(subItem => ({
                nome: subItem.Nome,
                grau: subItem.Grau,
                valor: subItem.valor ?? null,
                unidade: subItem.unidade ?? null,
                // Add more fields as needed
              })),
            }));
          }
        } catch (error) {
          console.error('Error parsing indicadores:', error);
        }

        parsedData.push(parsedItem);
      });
    }

    setCategoriesData(parsedData);
  };

  const renderLogo = (logoUrl) => {
    let additionalStyle = {};
    if (logoUrl.includes('40c6eaad-8815-4cbc-9caf-78f081f03674')) {
      return <MaterialCommunityIcons style={styles.iconContainer} name="head-lightbulb-outline" size={45} color="orange" />;
    } else if (logoUrl.includes('7ed63315-ff7b-4658-b488-7655487e2845')) {
      additionalStyle = { left: 41 };
      return <FontAwesome5 style={[styles.iconContainer, additionalStyle]} name="running" size={45} color="orange" />;
    } else if (logoUrl.includes('20118275-8791-469e-b9f5-3210f990dd01')) {
      additionalStyle = { left: 37.5 };
      return <Ionicons style={[styles.iconContainer, additionalStyle]} name="body" size={45} color="orange" />;
    } else {
      return null; // Handle other cases if necessary
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#FFA500" />
      </View>
    );
  }

  return (
    <View>
      <Header/>
      <ScrollView contentContainerStyle={styles.container}>
        {categoriesData.map((category, index) => (
          <View key={index} style={styles.categoryContainer}>
            <Text style={styles.categoryTitle}>{category.category}</Text>
            <View>
              <Rings dimen={category.category}/>
              {renderLogo(category.logo)}
            </View>
            {category.items.length > 0 && (
              category.items.map((item, idx) => (
                <View key={idx} style={styles.subCategoryContainer}>
                  <Text style={styles.subCategoryTitle}>{item.nome}</Text>
                  {item.subs.length > 0 && (
                    item.subs.map((subItem, subIdx) => (
                      <View key={subIdx} style={styles.subItem}>
                        <View style={{flexDirection: 'row'}}>
                          {/* Here is the compass(green, yellow, red) logic according to the "grau" */}
                          {subItem.grau == '1' ? (
                            <Compass color={'#4CAF50'} transf={"rotate(980 2560 2560)"}/>) :
                          subItem.grau == '2' ? (
                            <Compass color={'#FFE500'} transf={"rotate(1215 2560 2560)"}/>) :
                          subItem.grau == '3' ? (
                            <Compass color={'#EF4040'}/>) : (
                            <Text></Text>)}
                          {/* Here ends the compass(green, yellow, red) logic according to the "grau" */}
                          <Text style={styles.subItemTitle}>{subItem.nome}</Text>
                          </View>
                          {/* Render additional fields here as needed */}
                          {subItem.valor && (
                            <Text style={styles.subItemText}>{subItem.valor}{subItem.unidade}</Text>
                          )}
                      </View>
                    ))
                  )}
                </View>
              ))
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFF',
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  categoryTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FFA500',
    textAlign: 'center',
  },
  subCategoryContainer: {
    marginBottom: 15,
  },
  subCategoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FFA500',
  },
  subItem: {
    width: 350,
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: 'white',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 3,
  },
  subItemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000',
    marginLeft: 10
  },
  subItemText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
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

export default PdS;
