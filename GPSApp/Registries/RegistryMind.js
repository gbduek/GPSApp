import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Menu from '../Components/Menu';
import GraphicR from '../Components/GraphicR';

// Define the questionnaires for each sub-component
const questionnaires = {
  Estresse: [
    {
      id: '1',
      question: 'Você tem ficado triste por causa de algo que aconteceu inesperadamente?',
      options: ['Nunca', 'Quase nunca', 'Às vezes', 'Com frequência', 'Muito frequentemente'],
    },
    {
      id: '2',
      question: 'Você tem se sentido incapaz de controlar as coisas importantes em sua vida?',
      options: ['Nunca', 'Quase nunca', 'Às vezes', 'Com frequência', 'Muito frequentemente'],
    },
    {
      id: '3',
      question: 'Você tem se sentido nervoso e “estressado”?',
      options: ['Nunca', 'Quase nunca', 'Às vezes', 'Com frequência', 'Muito frequentemente'],
    },
  ],
  'Ansiedade e Humor': [
    {
      id: '1',
      question: 'How often do you feel anxious?',
      options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'],
    },
    {
      id: '2',
      question: 'How would you rate your anxiety level?',
      options: ['Very Low', 'Low', 'Moderate', 'High', 'Very High'],
    },
    {
      id: '3',
      question: 'What helps you calm down?',
      options: ['Exercise', 'Reading', 'Talking to someone', 'Meditation', 'Other'],
    },
  ],
  'Estresse Ocupacional': [
    {
      id: '1',
      question: 'How often do you feel stressed at work?',
      options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'],
    },
    {
      id: '2',
      question: 'How do you manage work-related stress?',
      options: ['Breaks', 'Talking to colleagues', 'Time management', 'Other'],
    },
  ],
  // Add more sub-component questionnaires as needed
};

const RegistryMind = ({ route, navigation }) => {
  const { title, description } = route.params;

  const handleNewRecord = () => {
    const questionnaire = questionnaires[title];
    navigation.navigate('Questionary', { title, questions: questionnaire });
  };

  const renderItem = ({ item }) => {
    switch (item.type) {
      case 'header':
        return <Text style={styles.pageTitle}>Mente &gt; {title}</Text>;
      case 'image':
        return (
          <Image
            source={{ uri: 'https://via.placeholder.com/300' }} // Placeholder image URL
            style={styles.image}
          />
        );
      case 'geometricShape':
        return (
          <View style={styles.geometricShape}>
            <View style={styles.shapeHeader}>
              <Text style={styles.shapeTitle}>{title}</Text>
              <TouchableOpacity style={styles.newRecordButton} onPress={handleNewRecord}>
                <Ionicons name="add" size={24} color="white" />
              </TouchableOpacity>
            </View>
            <Text style={styles.description}>{description}</Text>
            <Text style={styles.message}>Veja abaixo o gráfico do seu último registro!</Text>
            <GraphicR />
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

  return (
    <View style={styles.container}>
      <Menu />
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    fontSize: 20,
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

export default RegistryMind;
