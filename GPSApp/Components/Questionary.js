import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';
import DataContext from '../Context/DataContext';

const Questionary = ({ route, navigation }) => {
  const { type, title, id } = route.params;
  const [questions, setQuestions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [validationError, setValidationError] = useState('');
  const { token, userLogged } = useContext(DataContext);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`https://api3.gps.med.br/API/Medicao/GetQuestionariosOpcoes/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setQuestions(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching questions:', error);
        setLoading(false);
      }
    };

    if (token) {
      fetchQuestions();
    }
  }, [id, token]);

  const handleOptionSelect = (questionId, optionId) => {
    setSelectedOptions(prev => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const handleSave = async () => {
    const unansweredQuestions = questions.flatMap(questionary => questionary.questoes).filter(q => !selectedOptions[q.id]);
    if (unansweredQuestions.length > 0) {
      setValidationError('Por favor, responda todas as perguntas antes de salvar.');
      return;
    }

    setSaveLoading(true);

    const Medidores = Object.keys(selectedOptions).map(questionId => ({
      Medidor: questionId,
      Opcao: selectedOptions[questionId],
    }));

    const body = {
      DataFinal: new Date().toISOString(),
      DataInicial: new Date().toISOString(),
      Indicador: id,
      jejum: false,
      Medidores,
      PessoaFisica: userLogged,
    };


    try {
      const response = await axios.post('https://api3.gps.med.br/API/Medicao/SaveMedicao/', body, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      console.log('Save successful:', response.data);
      navigation.goBack(); // Navigate back to the previous screen
    } catch (error) {
      console.error('Error saving data:', error);
      // Handle error (e.g., show an error message, etc.)
    } finally {
      setSaveLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.geometricShape}>
      <Text style={styles.question}>{item.questao}</Text>
      {item.opcoes.map(option => (
        <TouchableOpacity
          key={option.id}
          style={[
            styles.option,
            selectedOptions[item.id] === option.id && styles.selectedOption,
          ]}
          onPress={() => handleOptionSelect(item.id, option.id)}
        >
          <View style={styles.optionCircle}>
            {selectedOptions[item.id] === option.id && <View style={styles.filledCircle} />}
          </View>
          <Text style={styles.optionText}>{option.opcao}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="orange" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>{type ? `${type} > ${title}` : title}</Text>
      {validationError ? (
        <Text style={styles.validationError}>{validationError}</Text>
      ) : null}
      <FlatList
        data={questions.flatMap(questionary => questionary.questoes)}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.flatListContent}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={saveLoading}>
            <Text style={styles.saveButtonText}>Salvar</Text>
            {saveLoading && <ActivityIndicator size="small" color="white" style={styles.saveButtonLoader} />}
          </TouchableOpacity>
        }
        style={styles.flatList}
      />
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
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
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'orange',
    padding: 15,
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  saveButtonLoader: {
    marginLeft: 10,
  },
  validationError: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default Questionary;
