import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert, ActivityIndicator } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Slider from '@react-native-community/slider';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import DataContext from '../../Context/DataContext';

const emotions = [
  { name: 'Alegria', color: 'yellow', id: '268036ce-4eef-4a33-ad06-502c777b6cca' },
  { name: 'Ansiedade', color: 'purple', id: '1bba6166-3184-4ed7-9de9-e6861106967e' },
  { name: 'Medo', color: 'blue', id: '8a975e43-0de2-4b66-95b1-48a5738af2b0' },
  { name: 'Nojo', color: 'green', id: '47dc3640-3b9a-4d09-86d9-2bdfb220fcd1' },
  { name: 'Raiva', color: 'red', id: '6e4ee370-6ce2-4745-bc9f-d5fb88547309' },
  { name: 'Tristeza', color: 'gray', id: '65af4d97-2942-4676-82fa-f15362b56ae7' },
];

const EmotionPopup = ({ onClose }) => {
  const { token, userLogged } = useContext(DataContext);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [intensity, setIntensity] = useState(5);
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const diaryId = 'a8772285-cc12-47c0-b947-eeac0a790b7a';

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const handleRegister = async () => {
    if (!selectedEmotion) {
      Alert.alert('Erro', 'Por favor, selecione uma emoção.');
      return;
    }

    setLoading(true);

    try {
      const selectedEmotionId = emotions.find(emotion => emotion.name === selectedEmotion).id;
      const postData = {
        pessoa: userLogged,
        pessoaFisica: userLogged,
        tipoDiario: diaryId,
        observacao: note,
        inicio: date.toISOString(),
        fim: date.toISOString(),
        emocao: selectedEmotionId,
        atividade: null,
        alimento: null,
        sintomas: [],
        intensidade: intensity,
        duracao: 0
      };

      await axios.post('https://api3.gps.med.br/API/diario', postData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      Alert.alert('Sucesso', 'Registro salvo com sucesso!');
      onClose(); // Close the popup after successful registration
    } catch (error) {
      console.error('Error registering emotion:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao registrar. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.popupContainer}>
      <View style={styles.popupContent}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <FontAwesome name="times" size={24} color="orange" />
        </TouchableOpacity>
        <Text style={styles.popupTitle}>Novo Registro</Text>
        
        <Text style={styles.subtitle}>Data e Hora</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePicker}>
          <Text style={styles.dateText}>{date.toLocaleString()}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="datetime"
            display="default"
            onChange={onDateChange}
          />
        )}

        <Text style={styles.subtitle}>Emoção</Text>
        <View style={styles.emotionContainer}>
          {emotions.map((emotion) => (
            <TouchableOpacity
              key={emotion.name}
              style={[
                styles.emotionButton,
                {
                  backgroundColor: selectedEmotion === emotion.name ? emotion.color : '#ccc',
                },
              ]}
              onPress={() => setSelectedEmotion(emotion.name)}
            >
              <Text style={styles.emotionText}>{emotion.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.subtitle}>Intensidade</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={10}
          step={1}
          value={intensity}
          onValueChange={(value) => setIntensity(value)}
          minimumTrackTintColor="orange"
          maximumTrackTintColor="#000000"
          thumbTintColor="orange"
        />
        <Text style={styles.intensityValue}>{intensity}</Text>

        <TextInput
          style={styles.input}
          placeholder="Digite aqui"
          value={note}
          onChangeText={(text) => setNote(text)}
        />

        <TouchableOpacity style={styles.registerButton} onPress={handleRegister} disabled={loading}>
          <Text style={styles.registerButtonText}>Registrar</Text>
          {loading && <ActivityIndicator size="small" color="white" style={styles.loadingIndicator} />}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  popupContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popupContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  popupTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'orange',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'orange',
    marginBottom: 10,
  },
  datePicker: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'orange',
    borderRadius: 5,
    marginBottom: 20,
  },
  dateText: {
    fontSize: 16,
    color: 'black',
  },
  emotionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  emotionButton: {
    padding: 10,
    borderRadius: 5,
  },
  emotionText: {
    color: 'white',
    fontWeight: 'bold',
  },
  slider: {
    width: '100%',
    height: 40,
    marginBottom: 10,
  },
  intensityValue: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  registerButton: {
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  registerButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loadingIndicator: {
    marginLeft: 10,
  },
});

export default EmotionPopup;
