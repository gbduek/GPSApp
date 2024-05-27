import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import Menu from './Components/Menu';

const Diary = () => {
  const renderItem = ({ item }) => {
    switch (item.type) {
      case 'header':
        return (
          <View style={styles.headerContainer}>
            <FontAwesome6 name={'book'} size={32} color="orange" />
            <Text style={styles.pageTitle}>Diários</Text>
          </View>
        );
      case 'image':
        return (
          <Image
            source={{ uri: 'https://via.placeholder.com/300' }} // Placeholder image URL
            style={styles.image}
          />
        );
      case 'geometricShape':
        return (
          <View>
            <View style={styles.geometricShape}>
              <View style={styles.shapeHeader}>
                <Text style={styles.shapeTitle}>rrrrrr</Text>
              </View>
              <Text style={styles.description}>Hello World</Text>
              <Text style={styles.message}>Veja abaixo o gráfico do seu último registro!</Text>
            </View>

            <View style={styles.geometricShape}>
              <View style={styles.shapeHeader}>
                <Text style={styles.shapeTitle}>rrrrrr</Text>
              </View>
              <Text style={styles.description}>Hello World</Text>
              <Text style={styles.message}>Veja abaixo o gráfico do seu último registro!</Text>
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  const data = [
    { id: 'header', type: 'header' },
    { id: 'image', type: 'image' },
    { id: 'geometricShape', type: 'geometricShape' },
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
    marginBottom: 20, // Add this line for spacing between shapes
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
});

export default Diary;
