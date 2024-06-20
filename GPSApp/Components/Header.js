import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <Image
        source={{ uri: 'https://plataforma.gps.med.br/img/brand/logo.png' }}
        style={styles.logoLeft}
        resizeMode="contain"
      />
      <Image
        source={{ uri: 'https://api3.gps.med.br/api/upload/image?vinculo=f606e77e-3086-472f-87c9-70d3541635ce' }}
        style={styles.logoRight}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingTop: 10,
    paddingBottom: 5, // Adjusted padding to be smaller on the bottom
    paddingHorizontal: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // For Android shadow
  },
  logoLeft: {
    width: 150,
    height: 50,
  },
  logoRight: {
    width: 100, // Scaled up the width
    height: 60, // Scaled up the height
  },
});

export default Header;
