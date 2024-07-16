import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { DrawerItemList } from '@react-navigation/drawer';

const CustomDrawerContent = (props) => {
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
});

export default CustomDrawerContent;
