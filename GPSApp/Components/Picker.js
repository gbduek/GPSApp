import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const Picker = ({ options, selectedOption, onSelect }) => {
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);

  const handleSelectorPress = () => setIsSelectorOpen(!isSelectorOpen);

  const handleOptionPress = (option) => {
    onSelect(option);
    setIsSelectorOpen(false);
  };

  const renderOption = ({ item }) => (
    <TouchableOpacity style={styles.option} onPress={() => handleOptionPress(item)}>
      <Text style={styles.optionText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <TouchableOpacity style={[styles.selector, isSelectorOpen && styles.selectorOpen]} onPress={handleSelectorPress}>
        <Text style={styles.selectorText}>{selectedOption}</Text>
        <FontAwesome name={isSelectorOpen ? 'angle-up' : 'angle-down'} size={22} color="orange" />
      </TouchableOpacity>
      {isSelectorOpen && (
        <View style={styles.optionsContainer}>
          {options.length > 4 ? (
            <FlatList
              data={options}
              renderItem={renderOption}
              keyExtractor={(item) => item.toString()}
              style={styles.flatList}
            />
          ) : (
            options.map((option) => (
              <TouchableOpacity key={option} style={styles.option} onPress={() => handleOptionPress(option)}>
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  selector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderWidth: 2,
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
    fontWeight: 'bold',
  },
  optionsContainer: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'orange',
    borderRadius: 10,
    marginBottom: 10,
    maxHeight: 200, // Adjust the max height as needed
  },
  flatList: {
    maxHeight: 200, // Adjust the max height as needed
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
});

export default Picker;
