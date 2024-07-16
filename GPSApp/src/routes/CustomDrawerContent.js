import React from 'react';
import { View, StyleSheet, Image, Linking } from 'react-native';
import { DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Ionicons } from "@expo/vector-icons";

const CustomDrawerContent = (props) => {
  const handleAjudaPress = () => {
    Linking.openURL('https://gps.med.br/biblioteca-de-tutoriais/');
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Image 
          source={require('../../assets/gps_logo.png')}
          style={styles.headerImage}
        />
      </View>
      <View style={styles.drawerItems}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Ajuda"
          labelStyle={styles.drawerLabel}
          icon={({ color, size }) => (
            <Ionicons name="alert-circle" size={size} color={color} />
          )}
          onPress={handleAjudaPress}
          style={styles.drawerItem}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 150,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    top: 30,
  },
  headerImage: {
    width: 240,
    height: 90,
    resizeMode: 'stretch',
  },
  drawerItems: {
    top: 20,
    flex: 1,
    backgroundColor: 'orange',
  },
  drawerLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: -15,
  },
  drawerItem: {
    marginTop: 10,
  },
});

export default CustomDrawerContent;
