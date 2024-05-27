import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const exampleData = [
  { date: '01/01', value: 20 },
  { date: '02/01', value: 35 },
  { date: '03/01', value: 45 },
  { date: '04/01', value: 55 },
  { date: '05/01', value: 65 },
  { date: '06/01', value: 75 },
];

const GraphicR = () => {
  return (
    <View style={styles.container}>
        {/* These are the vertical numbers of the left of the graphic*/}
      <View style={styles.yAxis}>
        {[80, 70, 60, 50, 40, 30, 20, 10, 0].map((value) => (
          <Text key={value} style={styles.yAxisText}>{value}</Text>
        ))}
      </View>
      <View style={styles.graph}>
        {exampleData.map((data, index) => (
          <View key={index} style={styles.barContainer}>
            <View
              style={[
                styles.bar,
                {
                  height: `${data.value}%`,
                  backgroundColor:
                    data.value > 60 ? 'red' :
                    data.value > 40 ? 'yellow' : 'green',
                },
              ]}
            />
            <Text style={styles.dateText}>{data.date}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  yAxis: {
    justifyContent: 'space-between',
    height: 200,
  },
  yAxisText: {
    fontSize: 12,
    textAlign: 'right',
    paddingRight: 5,
  },
  graph: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 200,
    width: '100%',
    paddingLeft: 10,
  },
  barContainer: {
    flex: 1,
    alignItems: 'center',
  },
  bar: {
    width: 20,
    borderRadius: 10,
  },
  dateText: {
    marginTop: 5,
    fontSize: 12,
  },
});

export default GraphicR;
