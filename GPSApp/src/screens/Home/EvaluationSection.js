import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import NotebookIcon from '../../../assets/Icons/NotebookIcon';
import styles from './styles';

const EvaluationSection = ({ temDiario, navigation }) => {
  const handleNavigation = (screen) => () => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      <View style={styles.paragraphContainer}>
        <TouchableOpacity onPress={handleNavigation('Diários')}>
          <Text style={styles.paragraphTitle}>Como você está hoje?</Text>
          <Text style={styles.paragraphDescription}>
            Registrando no diário, você poderá aumentar seu autoconhecimento e ter acesso ao seu histórico ao longo do tempo.
          </Text>
        </TouchableOpacity>
      </View>
      {temDiario ? (
        <NotebookIcon />
      ) : (
        <View style={styles.ribbonContainer}>
          <Text style={styles.ribbonText}>Você ainda não registrou nenhum diário</Text>
        </View>
      )}
    </View>
  );
};

export default EvaluationSection;
