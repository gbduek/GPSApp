import React, { useContext, useState, useEffect } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import DataContext from '../Context/DataContext';

const Header = () => {
  const navigation = useNavigation();
  const { companyPhoto } = useContext(DataContext);
  const [paddingOS, setPaddingOS] = useState(0);

  useEffect(() => {
    const osCheckPadding = () => {
      if (Platform.OS === 'ios') {
        setPaddingOS(40);
      } else if (Platform.OS === 'android') {
        setPaddingOS(10);
      } else {
        setPaddingOS(0);
      }
    };
    osCheckPadding(); // Invoke the function
  }, []); // Empty dependency array to run once on mount

  const openDrawer = () => {
    navigation.openDrawer();
  };

  return (
    <View style={[styles.headerContainer, { paddingTop: paddingOS }]}>
      <TouchableOpacity onPress={openDrawer} style={styles.drawerButton}>
        <Ionicons name="menu" size={28} color="orange" />
      </TouchableOpacity>
      <Image
        source={{ uri: 'https://plataforma.gps.med.br/img/brand/logo.png' }}
        style={styles.logoLeft}
        resizeMode="contain"
      />
      <Image
        source={{ uri: companyPhoto }}
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
    paddingHorizontal: 20, // Adjusted paddingHorizontal for more space
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // For Android shadow
    zIndex: 1,
  },
  logoLeft: {
    width: 150,
    height: 50,
    marginRight: 10, // Adjusted marginRight to separate from right image
  },
  logoRight: {
    width: 100,
    height: 60,
  },
  drawerButton: {
    padding: 0,
  },
});

export default Header;
