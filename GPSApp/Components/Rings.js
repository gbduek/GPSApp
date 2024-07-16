import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';

const Rings = ({ iconName }) => {
  // Define the percentage of each color
  const redPercentage = 30;
  const yellowPercentage = 30;
  const greenPercentage = 40;

  // Calculate the angles for each color
  const redAngle = (redPercentage / 100) * 360;
  const yellowAngle = (yellowPercentage / 100) * 360;
  const greenAngle = (greenPercentage / 100) * 360;

  return (
    <View style={styles.container}>
      <Svg width="120" height="120">
        {/* Green Circle */}
        <Circle
          cx="60"
          cy="60"
          r="47"
          stroke="#4CAF50"
          strokeWidth="22"
          fill="transparent"
          strokeDasharray={`${greenAngle}, 360`}
          transform="rotate(-90, 60, 60)"
        />
        {/* Yellow Circle */}
        <Circle
          cx="60"
          cy="60"
          r="47"
          stroke="#FFEB3B"
          strokeWidth="22"
          fill="transparent"
          strokeDasharray={`${yellowAngle}, 360`}
          transform={`rotate(${greenAngle - 90}, 60, 60)`}
        />
        {/* Red Circle */}
        <Circle
          cx="60"
          cy="60"
          r="47"
          stroke="#EF4040"
          strokeWidth="22"
          fill="transparent"
          strokeDasharray={`${redAngle}, 360`}
          transform={`rotate(${greenAngle + yellowAngle - 90}, 60, 60)`}
        />
      </Svg>
      <View style={styles.iconContainer}>
        {iconName && 
          <Ionicons name={iconName} size={48} color="#ffa500" />
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'white',
  },
  iconContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'transparent',
    top: 35,
  },
});

export default Rings;
