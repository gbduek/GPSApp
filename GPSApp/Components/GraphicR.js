import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import axios from 'axios';
import DataContext from '../Context/DataContext';
import Tooltip from './UIComp/Tooltip';

const GraphicR = ({ id }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tooltipIndex, setTooltipIndex] = useState(null); // State to manage which tooltip is visible
  const { token, userLogged } = useContext(DataContext);
  const [modalVisible, setModalVisible] = useState(false); // State to manage modal visibility

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api3.gps.med.br/API/DadosIndicadores/page-data/${userLogged}/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const apiData = response.data.GraficoEvolutivo.map(item => ({
          date: new Date(item.UltimaMedicaoData).toLocaleDateString('en-US', {
            year: '2-digit',
            month: '2-digit',
          }),
          value: item.UltimaMedicao,
          color: item.CorExibicao,
          nome: item.Nome,
        }));
        setData(apiData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, token, userLogged]);

  const handleBarPress = (index) => {
    setTooltipIndex(index);
    setModalVisible(true); // Show the modal when the tooltip is visible
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setTooltipIndex(null); // Close the tooltip
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#FFA500" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* These are the vertical numbers on the left of the graphic */}
      <View style={styles.yAxis}>
        {[100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 0].map((value) => (
          <Text key={value} style={styles.yAxisText}>{value}</Text>
        ))}
      </View>
      <View style={styles.graph}>
        {data.map((dataItem, index) => (
          <View key={index} style={styles.barContainer}>
            <TouchableOpacity
              onPress={() => handleBarPress(index)}
              style={[
                styles.bar,
                {
                  height: `${Math.min(dataItem.value, 100)}%`,
                  backgroundColor: dataItem.color,
                },
              ]}
            />
            <Text style={styles.dateText}>{dataItem.date}</Text>
          </View>
        ))}
      </View>

      {/* Modal for displaying tooltips */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={handleCloseModal}
      >
        <TouchableWithoutFeedback onPress={handleCloseModal}>
          <View style={styles.modalContainer}>
            <View style={styles.tooltipContainer}>
              <Tooltip
                isVisible={tooltipIndex !== null}
                content={`${data[tooltipIndex]?.nome}: ${data[tooltipIndex]?.value}`}
                position="top"
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 20,
    marginBottom: 20,
  },
  yAxis: {
    justifyContent: 'space-between',
    height: 200,
  },
  yAxisText: {
    fontSize: 14,
    textAlign: 'right',
  },
  graph: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 200,
    width: '100%',
    top: 20,
  },
  barContainer: {
    flex: 1,
    alignItems: 'center',
    position: 'relative', // Ensure tooltips are positioned relative to this container
  },
  bar: {
    width: 20,
    borderRadius: 10,
  },
  dateText: {
    marginTop: 5,
    fontSize: 12,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tooltipContainer: {
    padding: 20,
    borderRadius: 8,
    maxWidth: 200,
    alignItems: 'center',
  },
});

export default GraphicR;
