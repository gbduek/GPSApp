import React, {useContext} from 'react';
import { View, StyleSheet, Image, Linking, Alert } from 'react-native';
import { DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Ionicons } from "@expo/vector-icons";
import axios from 'axios';
import DataContext from '../../Context/DataContext';

const CustomDrawerContent = (props) => {
  const { userLogged } = useContext(DataContext);

  const handleAjudaPress = () => {
    Linking.openURL('https://gps.med.br/biblioteca-de-tutoriais/');
  };

  const handleLogout = async () => {
    try {
      // Make the Axios request to log out
      await axios.get(`https://api3.gps.med.br/API/Acesso/Logout/${userLogged}`);
      // Reset authentication state to log out the user
      props.setIsAuthenticated(false);
    } catch (error) {
      Alert.alert('Error', 'Failed to log out. Please try again.');
    }
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
        <DrawerItem
          label="Sair"
          labelStyle={styles.drawerLabel}
          icon={({ color, size }) => (
            <Ionicons name="exit-outline" size={size} color={color} />
          )}
          onPress={handleLogout}
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
