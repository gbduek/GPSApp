import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SliderGeo = ({ iconName, percentage, title }) => {
  // Percentage value for the slider bar (for testing, use a random value)
  const barPercentage = percentage;

  return (
    <View style={styles.container}>
      <View style={styles.rect}>
        <Ionicons name={iconName} size={32} color="#ffa500" style={styles.icon} />
        <Text style={styles.titleStyle}>{title}</Text>
        <Text style={styles.percentageText}>{Math.round(barPercentage)}%</Text>
        <View style={styles.barContainer}>
          <View style={[styles.filledBar, { width: `${barPercentage}%` }]} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: 'center',
  },
  rect: {
    width: 330,
    height: 100,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 15,
    justifyContent: 'space-between',
  },
  icon: {
    position: 'absolute',
    top: 15,
    left: 15,
  },
  percentageText: {
    position: 'absolute',
    top: 15,
    right: 15,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'orange',
  },
  barContainer: {
    position: 'absolute',
    bottom: 15,
    left: 15,
    right: 15,
    height: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
  },
  filledBar: {
    height: 20,
    backgroundColor: 'orange',
    borderRadius: 10,
  },
  titleStyle: {
    position: 'absolute',
    left: 50,
    top: 20,
    fontSize: 20,
    color: 'orange',
    fontWeight: 'bold',
  }
});

export default SliderGeo;
