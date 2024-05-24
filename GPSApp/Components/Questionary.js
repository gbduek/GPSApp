import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Menu from './Menu';

const Questionary = ({ route }) => {
  const { title, questions } = route.params;

  const [selectedOptions, setSelectedOptions] = useState({});

  const handleOptionSelect = (questionId, option) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [questionId]: option,
    }));
  };

  const renderItem = ({ item }) => (
    <View style={styles.geometricShape}>
      <Text style={styles.question}>{item.question}</Text>
      {item.options.map((option) => (
        <TouchableOpacity
          key={option}
          style={[
            styles.option,
            selectedOptions[item.id] === option && styles.selectedOption,
          ]}
          onPress={() => handleOptionSelect(item.id, option)}
        >
          <View style={styles.optionCircle}>
            {selectedOptions[item.id] === option && <View style={styles.filledCircle} />}
          </View>
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <Menu />
      <Text style={styles.pageTitle}>Mente &gt; {title}</Text>
      <FlatList
        data={questions}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.flatListContent}
        showsVerticalScrollIndicator={false}
        style={styles.flatList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 20, // Added padding to the top to avoid overlap
  },
  pageTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20, // Increased bottom margin for spacing
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
  geometricShape: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginVertical: 10, // Vertical margin for spacing
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
