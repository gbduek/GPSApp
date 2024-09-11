import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import DataContext from '../../../Context/DataContext';
import Header from '../../../Components/Header';
import styles from './styles';

const Dimension = ({ navigation, id }) => {
  const { percentages, loading, fetchPercentages, token, userLogged } = useContext(DataContext);
  const [data, setData] = useState();
  const [nome, setNome] = useState();

  // Map id to icon and percentage key
  const idMap = {
    '20118275-8791-469e-b9f5-3210f990dd01': {
      icon: <Ionicons style={{ paddingRight: 5 }} name="body" size={28} color="orange" />,
      percentageKey: 'corpo',
    },
    '40c6eaad-8815-4cbc-9caf-78f081f03674': {
      icon: <MaterialCommunityIcons style={{ paddingRight: 5 }} name="head-lightbulb-outline" size={28} color="orange" />,
      percentageKey: 'mente',
    },
    '7ed63315-ff7b-4658-b488-7655487e2845': {
      icon: <FontAwesome5 style={{ paddingRight: 10 }} name="running" size={28} color="orange" />,
      percentageKey: 'lifestyle',
    },
  };

  const current = idMap[id] || {
    icon: <Ionicons style={{ paddingRight: 5 }} name="body" size={28} color="orange" />,
    percentageKey: 'corpo',
  };

  const { icon, percentageKey } = current;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!token || !userLogged) {
          throw new Error('Token or userLogged not found');
        }

        fetchPercentages();

        const response = await axios.get(`https://api3.gps.med.br/API/DadosIndicadores/tipo-indicadores-porcetagem-preenchimento/${userLogged}/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setData(response.data.indicadores);
        setNome(response.data.nome);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userLogged, id]);

  const handleFormOpen = (item) => {
    navigation.navigate('Registry', { title: item.nome, id: item.id, type: nome });
  };

  const SubComponent = ({ title, onPress }) => (
    <View style={styles.subComponent}>
      <Text style={styles.subComponentTitle}>{title}</Text>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.iconContainer}>
          <Ionicons name="arrow-forward" size={24} color="white" />
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <View style={styles.container}>
        <View style={styles.header}>
          {icon}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{nome}</Text>
            {loading ? (
              <Text>Loading...</Text>
            ) : (
              <Text style={styles.percentage}>{percentages[percentageKey]}%</Text>
            )}
          </View>
        </View>
        <Image
          source={{ uri: `https://api3.gps.med.br/api/upload/image?vinculo=${id}` }}
          style={styles.image}
        />
        <FlatList
          scrollIndicatorInsets={{ right: 1 }}
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <SubComponent title={item.nome} onPress={() => handleFormOpen(item)} />
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListFooterComponent={() => <View style={styles.footer} />}
        />
      </View>
    </View>
  );
};

export default Dimension;
