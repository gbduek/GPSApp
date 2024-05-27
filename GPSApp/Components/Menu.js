import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Menu = () => {
  const navigation = useNavigation();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [navOpacity] = useState(new Animated.Value(0));

  const handleButtons = (letter) => {
    if (isNavOpen) {
      if (letter === 'A') {
        navigation.navigate('Home');
      } else if (letter === 'B') {
        navigation.navigate('Mente');
      } else if (letter === 'C') {
        navigation.navigate('LifeStyle');
      } else if (letter === 'E'){
        navigation.navigate('Diary');
      } else {
        console.log("Unknown letter was passed.");
      }
    }
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  useEffect(() => {
    Animated.timing(navOpacity, {
      toValue: isNavOpen ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isNavOpen, navOpacity]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.navButton} onPress={toggleNav}>
        <Ionicons name={isNavOpen ? 'menu' : 'menu-outline'} size={32} color="#ffffff" />
      </TouchableOpacity>
      {isNavOpen && (
        <Animated.View style={[styles.navContainer, { opacity: navOpacity }]}>
          <TouchableOpacity style={styles.navItem} onPress={() => handleButtons('A')}>
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => handleButtons('B')}>
            <Text style={styles.navText}>Mente</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => handleButtons('C')}>
            <Text style={styles.navText}>Estilo de Vida</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navText}>Corpo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => handleButtons('E')}>
            <Text style={styles.navText}>Diários</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navText}>Perfil de Saúde</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navText}>Recomendações</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    zIndex: 1,
  },
  navButton: {
    position: 'absolute',
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 165, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  navContainer: {
    position: 'absolute',
    width: 270,
    height: 420,
    bottom: 90,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'orange',
    zIndex: 2,
  },
  navItem: {
    marginBottom: 10,
  },
  navText: {
    fontSize: 28,
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default Menu;
