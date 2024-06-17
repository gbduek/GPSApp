import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Slider from '@react-native-community/slider';
import { FontAwesome } from '@expo/vector-icons';

const emotions = [
  { name: 'Alegria', color: 'yellow' },
  { name: 'Ansiedade', color: 'purple' },
  { name: 'Medo', color: 'blue' },
  { name: 'Nojo', color: 'green' },
  { name: 'Raiva', color: 'red' },
  { name: 'Tristeza', color: 'gray' },
];

const EmotionPopup = ({ onClose }) => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [intensity, setIntensity] = useState(5);
  const [note, setNote] = useState('');

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
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

        <TouchableOpacity style={styles.registerButton}>
          <Text style={styles.registerButtonText}>Registrar</Text>
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
  },
  registerButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default EmotionPopup;
