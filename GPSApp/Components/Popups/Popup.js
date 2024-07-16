import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Linking } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const Popup = ({ isVisible, data, onClose }) => {
  if (!isVisible || !data) return null;

  const handleLinkPress = (url) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.popupContainer}>
      <View style={styles.popupContent}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <FontAwesome name="times" size={24} color="orange" />
        </TouchableOpacity>
        <Text style={styles.popupTitle}>{data.nome}</Text>
        <Text style={styles.popupDescription}>{data.recomendacao}</Text>
        {data.foto && (
          <Image source={{ uri: data.foto }} style={styles.popupImage} />
        )}
        <TouchableOpacity 
          style={styles.popupButton} 
          onPress={() => handleLinkPress(data.link)}
        >
          <Text style={styles.popupButtonText}>Saiba Mais</Text>
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
    bottom: 100,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  popupTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'orange',
    marginBottom: 10,
  },
  popupDescription: {
    fontSize: 16,
    marginBottom: 10,
  },
  popupImage: {
    width: 300,
    height: 200,
    marginBottom: 20,
    marginTop: 20,
    resizeMode: 'stretch',
  },
  popupButton: {
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  popupButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Popup;
