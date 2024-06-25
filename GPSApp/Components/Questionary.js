import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import Menu from './Menu';
import axios from 'axios';
import DataContext from '../Context/DataContext'; // Assuming DataContext is correctly exported

const Questionary = ({ route }) => {
  const { title, id } = route.params;
  const [questions, setQuestions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const { token } = useContext(DataContext); // Use the context to get token for authorization

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`https://api3.gps.med.br/API/Medicao/GetQuestionariosOpcoes/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        // Assuming response.data is an array and not an object with a data property
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    if (token) {
      fetchQuestions();
    }
  }, [id, token]);

  const handleOptionSelect = (questionId, option) => {
    setSelectedOptions(prev => ({
      ...prev,
      [questionId]: option,
    }));
  };

  const renderItem = ({ item }) => (
    <View style={styles.geometricShape}>
      <Text style={styles.question}>{item.questao}</Text>
      {item.opcoes.map(option => (
        <TouchableOpacity
          key={option.id}
          style={[
            styles.option,
            selectedOptions[item.id] === option.opcao && styles.selectedOption,
          ]}
          onPress={() => handleOptionSelect(item.id, option.opcao)}
        >
          <View style={styles.optionCircle}>
            {selectedOptions[item.id] === option.opcao && <View style={styles.filledCircle} />}
          </View>
          <Text style={styles.optionText}>{option.opcao}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <Menu />
      <Text style={styles.pageTitle}>Mente &gt; {title}</Text>
      {questions.length === 0 ? (
        <ActivityIndicator size="large" color="orange" style={styles.loadingIndicator} />
      ) : (
        <FlatList
          data={questions.flatMap(questionary => questionary.questoes)} // Flatten questoes array from each questionary
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.flatListContent}
          showsVerticalScrollIndicator={false}
          style={styles.flatList}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 20,
  },
  pageTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'orange',
    textAlign: 'center',
  },
  flatListContent: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  flatList: {
    flex: 1,
  },
  loadingIndicator: {
    marginTop: 50,
  },
  geometricShape: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  optionCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  filledCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'orange',
  },
  optionText: {
    fontSize: 16,
  },
  selectedOption: {
    fontWeight: 'bold',
  },
});

export default Questionary;
