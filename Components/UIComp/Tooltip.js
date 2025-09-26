import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Tooltip = ({ isVisible, content, position = 'top', style }) => {
    return isVisible ? (
      <View style={[styles.tooltipContainer, styles[position], style]}>
        <Text style={styles.tooltipText}>{content}</Text>
      </View>
    ) : null;
  };
  

const styles = StyleSheet.create({
  tooltipContainer: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    borderRadius: 8,
    padding: 10,
    maxWidth: 200,
    zIndex: 1000,
  },
  tooltipText: {
    color: '#fff',
    textAlign: 'center',
  },
  top: {
    bottom: '100%',
    marginBottom: 5,
  },
  bottom: {
    top: '100%',
    marginTop: 5,
  },
  left: {
    right: '100%',
    marginRight: 5,
  },
  right: {
    left: '100%',
    marginLeft: 5,
  },
});

export default Tooltip;
