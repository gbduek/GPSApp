import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Slider from '@react-native-community/slider';
import { FontAwesome } from '@expo/vector-icons';

const MovementPopup = ({ onClose }) => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [intensity, setIntensity] = useState(5);

  const activities = [
    'Artes Marciais', 'Basquete', 'Beach tênis', 'Caiaque', 'Caminhada',
    'Esteira', 'Canoa', 'Ciclismo', 'Spinning', 'Futebol', 'Meditação'
  ];

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const toggleActivityDropdown = () => {
    setSelectedActivity(selectedActivity === null ? activities[0] : null);
  };

  return (
    <View style={styles.popupContainer}>
      <View style={styles.popupContent}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <FontAwesome name="times" size={24} color="orange" />
        </TouchableOpacity>
        <Text style={styles.popupTitle}>Novo Registro</Text>
        
        <Text style={styles.subtitle}>Data e Hora</Text>
        <TouchableOpacity onPress={toggleDatePicker} style={styles.datePicker}>
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

        <TouchableOpacity onPress={toggleActivityDropdown} style={styles.dropdownButton}>
          <Text style={styles.subtitle}>Atividades</Text>
          <Text style={styles.dropdownText}>{selectedActivity || 'Selecionar atividade'}</Text>
          <FontAwesome name={selectedActivity ? 'angle-up' : 'angle-down'} size={20} color="orange" />
        </TouchableOpacity>
        {selectedActivity && (
          <View style={styles.activitiesContainer}>
            {activities.map((activity, index) => (
              <TouchableOpacity
                key={index}
                style={styles.activityItem}
                onPress={() => setSelectedActivity(activity)}
              >
                <Text style={styles.activityText}>{activity}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

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

        <TouchableOpacity style={styles.registerButton}>
          <Text style={styles.registerButtonText}>Registrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  popupContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  popupContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  popupTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'orange',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'orange',
    marginTop: 10,
  },
  datePicker: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'orange',
  },
  dateText: {
    fontSize: 16,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'orange',
    marginTop: 10,
  },
  dropdownText: {
    fontSize: 16,
  },
  activitiesContainer: {
    maxHeight: 150,
    overflowY: 'scroll',
    marginTop: 10,
  },
  activityItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'orange',
  },
  activityText: {
    fontSize: 16,
  },
  slider: {
    marginTop: 10,
  },
  intensityValue: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  registerButton: {
    backgroundColor: 'orange',
    borderRadius: 25,
    paddingVertical: 15,
    marginTop: 20,
  },
  registerButtonText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
});

export default MovementPopup;
