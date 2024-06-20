import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiUrl = 'https://api3.gps.med.br/API/Acesso/login';
const userDataUrl = 'https://api3.gps.med.br/API/Acesso/obter-dados-usuario'; // API endpoint to fetch user data

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State to manage loading indicator
  const navigation = useNavigation();

  const handleLogin = async () => {
    setIsLoading(true); // Start loading indicator
    try {
      const response = await axios.post(apiUrl, {
        Usuario: email,
        Senha: password
      });

      const { token } = response.data;

      // Log the response data
      console.log('Login Response Data:', response.data);

      // Make request to get user data using the token
      const userDataResponse = await axios.get(userDataUrl, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Log the user data response
      console.log('User Data Response:', userDataResponse.data);

      // Extract necessary data from the user data response
      const { userCompany, userLogged, userLoggedName } = userDataResponse.data;

      // Store user data in AsyncStorage
      await AsyncStorage.setItem('userCompany', userCompany);
      await AsyncStorage.setItem('userLogged', userLogged);
      await AsyncStorage.setItem('userLoggedName', userLoggedName);
      await AsyncStorage.setItem('token', token);

      // Navigate to Home screen or do other necessary actions
      navigation.navigate('Home');
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        console.log('Response Error:', error.response.data); // Detailed error message from the server
        console.log('Response Status:', error.response.status); // HTTP status code
        Alert.alert('O Login falhou', 'Senha ou usuário inválido(s)');
      } else if (error.request) {
        // The request was made but no response was received
        console.log('Request Error:', error.request);
        Alert.alert('O Login falhou', 'Sem resposta do servidor');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error:', error.message);
        Alert.alert('O Login falhou', 'Um erro inesperado aconteceu');
      }
    } finally {
      setIsLoading(false); // Stop loading indicator
    }
  };

  const handleForgotPassword = () => {
    // Implement your forgot password logic here
    Alert.alert('Esqueci minha senha', 'Implementar a lógica de recuperação de senha');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/gps_logo.png')}
        style={{ width: 300, height: 120, resizeMode: 'stretch', marginBottom: 40 }}
      />
      <TextInput
        style={[styles.input, emailFocused && styles.inputFocused]}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
        autoCapitalize="none"
        onFocus={() => setEmailFocused(true)}
        onBlur={() => setEmailFocused(false)}
      />
      <TextInput
        style={[styles.input, passwordFocused && styles.inputFocused]}
        placeholder="Senha"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
        onFocus={() => setPasswordFocused(true)}
        onBlur={() => setPasswordFocused(false)}
      />
      <TouchableOpacity
        onPress={handleLogin}
        style={styles.touchableOpacity}
        disabled={isLoading} // Disable button when loading
      >
        <Text style={styles.text}>Entrar</Text>
        {isLoading && (
          <ActivityIndicator size="small" color="#ffa500" style={{ marginLeft: 10 }} />
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text
          style={{
            fontSize: 18,
            lineHeight: 21,
            fontWeight: 'bold',
            letterSpacing: 0.25,
            paddingTop: 20,
            color: 'white',
          }}
        >
          Esqueci minha senha
        </Text>
      </TouchableOpacity>
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
    marginBottom: 30,
    paddingHorizontal: 15,
    backgroundColor: '#ffa500',
  },
  inputFocused: {
    backgroundColor: 'white',
  },
  touchableOpacity: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row', // Align text and indicator horizontally
    paddingVertical: 15,
    paddingHorizontal: 32,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: 'white',
    width: 300,
    marginTop: 5, // Adjusted margin
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
