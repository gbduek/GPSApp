import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import localImage from './assets/lifestyle.png';
import Menu from './Components/Menu';

const LifeStyle = () => {
  const [percentage, setPercentage] = useState(100); // Random initial percentage

  // Function to handle form opening, you can customize this as per your form requirements
  const handleFormOpen = (category) => {
    // Logic to open form for the selected category
    console.log(`Opening form for ${category}`);
  };

  // Data for sub-components
  const data = [
    { id: '1', title: 'Tabagismo' },
    { id: '2', title: 'Qualidade de Vida' },
    { id: '3', title: 'Mudança de Comportamento' },
    { id: '4', title: 'Prevenção de Acidentes' },
    { id: '5', title: 'Doenças Crônicas' },
    { id: '6', title: 'Exames Preventivos' },
  ];

  // Sub Component
  const SubComponent = ({ title, onPress }) => {
    return (
      <View style={styles.subComponent}>
        <Text style={styles.subComponentTitle}>{title}</Text>
        {/* Button to open form */}
        <TouchableOpacity onPress={onPress}>
          <View style={styles.iconContainer}>
            <Ionicons name="arrow-forward" size={24} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Menu/>
      <View style={styles.header}>
        <FontAwesome5 style={{paddingRight: 10}} name="running" size={28} color="orange" />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Estilo de Vida</Text>
          <Text style={styles.percentage}>{percentage}%</Text>
        </View>
      </View>
      <Image
        source={localImage} // Placeholder image URL, replace it later
        style={styles.image}
      />
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SubComponent title={item.title} onPress={() => handleFormOpen(item.title)} />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListFooterComponent={() => (
          <View style={styles.footer}>
            {/* Empty View to keep the footer at the bottom */}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    color: 'orange',
  },
  percentage: {
    fontSize: 20,
  },
  image: {
    width: '100%',
    height: 250,
    marginBottom: 15,
  },
  subComponent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  subComponentTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  separator: {
    height: 1,
    backgroundColor: 'gray',
    marginVertical: 8,
  },
  footer: {
    flex: 1,
  },
  iconContainer: {
    backgroundColor: 'orange',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LifeStyle;
