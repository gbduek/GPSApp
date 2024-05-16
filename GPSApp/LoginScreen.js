// LoginScreen.js

import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Image, Pressable } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const textEntrar = 'Entrar';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    // try {
    //   const response = await axios.post('your-backend-authentication-endpoint', {
    //     email,
    //     password,
    //   });
    //   // Handle successful login response
    //   console.log('Login successful:', response.data);
    //   // Redirect to the home page
    navigation.navigate('Home');
    // } catch (error) {
    //   // Handle error response from your backend
    //   console.error('Login error:', error);
    // }
  };

  return (
    <View style={styles.container}>
      <Image
          source={
            require('./assets/gps_logo.png')
          }
          style={{width: 300, height: 120, resizeMode: 'stretch', marginBottom: 40}}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      <Pressable
        onPress={handleLogin} 
        style={styles.pressable}>
          <Text style={styles.text}>Entrar</Text>
      </Pressable>
      <Text
        style={{fontSize: 18,
          lineHeight: 21,
          fontWeight: 'bold',
          letterSpacing: 0.25,
          paddingTop: 20,
          color: 'white',}}>
            Esqueci minha senha
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 100,
    backgroundColor: '#ffa500',
  },
  input: {
    height: 50,
    width: '100%',
    borderColor: 'white',
    borderRadius: 20,
    borderWidth: 3,
    marginBottom: 35,
    paddingHorizontal: 15,
    backgroundColor: '#ffa500',
  },
  pressable: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 32,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: 'white',
    width: 300
  },
  pressed: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 32,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: 'gray',
    width: 300
  },
  text: {
    fontSize: 18,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#ffa500',
  },
});

export default LoginScreen;
