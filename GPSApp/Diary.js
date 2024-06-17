import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Menu from './Components/Menu';
import EmotionPopup from './Components/Popups/EmotionPopup';
import MovementPopup from './Components/Popups/MovementPopup';

const Diary = () => {
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('de Emoções');
  const [isEmotionPopupOpen, setIsEmotionPopupOpen] = useState(false);
  const [isMovementPopupOpen, setIsMovementPopupOpen] = useState(false);
  const [imageUri, setImageUri] = useState('https://api3.gps.med.br/api/upload/image?vinculo=a8772285-cc12-47c0-b947-eeac0a790b7a');

  const options = ['de Emoções', 'de Movimento', 'de Sintomas'];

  const handleSelectorPress = () => {
    setIsSelectorOpen(!isSelectorOpen);
  };

  const handleOptionPress = (option) => {
    setSelectedOption(option);
    setIsSelectorOpen(false);
    closeAllPopups(); // Close all popups when switching options
    updateImageUri(option); // Update image URL based on selected option
  };

  const toggleEmotionPopup = () => {
    setIsEmotionPopupOpen(!isEmotionPopupOpen);
  };

  const toggleMovementPopup = () => {
    setIsMovementPopupOpen(!isMovementPopupOpen);
  };

  const closeAllPopups = () => {
    setIsEmotionPopupOpen(false);
    setIsMovementPopupOpen(false);
  };

  const updateImageUri = (option) => {
    switch (option) {
      case 'de Emoções':
        setImageUri('https://api3.gps.med.br/api/upload/image?vinculo=a8772285-cc12-47c0-b947-eeac0a790b7a');
        break;
      case 'de Movimento':
        setImageUri('https://api3.gps.med.br/api/upload/image?vinculo=ee8cf8bb-36ff-4838-883b-75179867d095');
        break;
      case 'de Sintomas':
        setImageUri('https://api3.gps.med.br/api/upload/image?vinculo=a0a1d9b5-2268-4aed-9040-44fb3d88975e');
        break;
      default:
        setImageUri('https://api3.gps.med.br/api/upload/image?vinculo=a8772285-cc12-47c0-b947-eeac0a790b7a');
        break;
    }
  };

  const renderPopup = () => {
    switch (selectedOption) {
      case 'de Emoções':
        return (
          <EmotionPopup onClose={() => setIsEmotionPopupOpen(false)} />
        );
      case 'de Movimento':
        return (
          <MovementPopup onClose={() => setIsMovementPopupOpen(false)} />
        );
      default:
        return null;
    }
  };

  const renderItem = ({ item }) => {
    switch (item.type) {
      case 'header':
        return (
          <View>
            <View style={styles.headerContainer}>
              <FontAwesome name={'book'} size={32} color="orange" />
              <Text style={styles.pageTitle}>Diários</Text>
            </View>
            <Image
              source={{ uri: imageUri }} // Dynamic image source based on selected option
              style={styles.image}
            />
          </View>
        );
      case 'selector':
        return (
          <View>
            <TouchableOpacity
              style={[styles.selector, isSelectorOpen && styles.selectorOpen]}
              onPress={handleSelectorPress}
            >
              <Text style={styles.selectorText}>{selectedOption}</Text>
              <FontAwesome name={isSelectorOpen ? 'angle-up' : 'angle-down'} size={20} color="orange" />
            </TouchableOpacity>
            {isSelectorOpen && (
              <View style={styles.optionsContainer}>
                {options.map((option) => (
                  <TouchableOpacity key={option} style={styles.option} onPress={() => handleOptionPress(option)}>
                    <Text style={styles.optionText}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        );
      case 'geometricShape':
        return (
          <View style={styles.geometricShape}>
            <View style={styles.shapeHeader}>
              <Text style={styles.shapeTitle}>Shape</Text>
            </View>
            <Text style={styles.description}>Hello World</Text>
            <Text style={styles.message}>Veja abaixo o gráfico do seu último registro!</Text>
          </View>
        );
      default:
        return null;
    }
  };

  const data = [
    { id: 'header', type: 'header' },
    { id: 'selector', type: 'selector' },
    { id: 'geometricShape1', type: 'geometricShape' },
    { id: 'geometricShape2', type: 'geometricShape' },
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

      {/* Emotion Popup */}
      {isEmotionPopupOpen && renderPopup()}

      {/* Movement Popup */}
      {isMovementPopupOpen && renderPopup()}

      {/* + Icon Button */}
      <TouchableOpacity style={styles.addButton} onPress={() => selectedOption === 'de Emoções' ? toggleEmotionPopup() : toggleMovementPopup()}>
        <FontAwesome name="plus" size={20} color="white" />
      </TouchableOpacity>
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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  pageTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'orange',
    textAlign: 'center',
    left: 10,
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
    marginBottom: 20, // spacing between shapes
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
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  selector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: 'orange',
    borderRadius: 25,
    marginBottom: 20,
  },
  selectorOpen: {
    marginBottom: 10,
  },
  selectorText: {
    fontSize: 16,
    color: 'orange',
  },
  optionsContainer: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'orange',
    borderRadius: 5,
    marginBottom: 10,
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'orange',
  },
  optionText: {
    fontSize: 16,
    color: 'orange',
  },
  popupContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 100,
  },
  addButton: {
    position: 'absolute',
    top: 20, // Ensure the + button is at the top right corner
    right: 20,
    backgroundColor: 'orange',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default Diary;
