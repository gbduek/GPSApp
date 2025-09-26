import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';

const GreetingSection = ({ firstName }) => {
  return (
    <Text style={styles.greetingText}>Olá, {firstName}</Text>
  );
};

export default GreetingSection;