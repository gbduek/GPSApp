import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Menu = () => {
  const navigation = useNavigation();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [navOpacity] = useState(new Animated.Value(0));

  const randomImageURL = `https://api3.gps.med.br/API/upload/image?vinculo=e91f978d-da58-e792-92cb-c0b993b24afd&tipo=pessoa`;

  const navigationItems = [
    { label: 'Home', screen: 'Home', icon: 'home-outline' },
    { label: 'Mente', screen: 'Mente', icon: 'happy-outline' },
    { label: 'Estilo de Vida', screen: 'LifeStyle', icon: 'walk-outline' },
    { label: 'Corpo', screen: 'Corpo', icon: 'body-outline' },
    { label: 'Diários', screen: 'Diary', icon: 'book-outline' },
    { label: 'Perfil de Saúde', screen: null, icon: 'person-outline' },
    { label: 'Recomendações', screen: null, icon: 'star-outline' },
  ];

  const handleNavigation = (screen) => () => {
    if (screen) {
      navigation.navigate(screen);
    }
    setIsNavOpen(false);
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
        <Ionicons name={isNavOpen ? 'menu-outline' : 'menu'} size={32} color="#ffffff" />
      </TouchableOpacity>
      {isNavOpen && (
        <Animated.View style={[styles.navContainer, { opacity: navOpacity }]}>
          {navigationItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.navItem}
              onPress={handleNavigation(item.screen)}
            >
              <Ionicons name={item.icon} size={24} color="#ffffff" style={styles.icon} />
              <Text style={styles.navText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
          {/* Profile Image */}
          <TouchableOpacity style={styles.profileImageContainer} onPress={handleNavigation('Profile')}>
            <View style={styles.profileImageWrapper}>
              <Image source={{ uri: randomImageURL }} style={styles.profileImage} />
            </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
  navText: {
    fontSize: 28,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  profileImageContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    borderRadius: 40,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'white',
  },
  profileImageWrapper: {
    width: 60,
    height: 60,
    borderRadius: 40,
    backgroundColor: 'orange', // Orange circle background
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
});

export default Menu;
