import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiUrl = 'https://api3.gps.med.br/API/Acesso/login';
const userDataUrl = 'https://api3.gps.med.br/API/Acesso/obter-dados-usuario';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(apiUrl, {
        Usuario: email,
        Senha: password
      });

      const { token } = response.data;

      console.log('Login Response Data:', response.data);

      const userDataResponse = await axios.get(userDataUrl, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log('User Data Response:', userDataResponse.data);

      const { userCompany, userLogged, userLoggedName, profilePhoto } = userDataResponse.data;

      await AsyncStorage.setItem('userCompany', userCompany);
      await AsyncStorage.setItem('userLogged', userLogged);
      await AsyncStorage.setItem('userLoggedName', userLoggedName);
      await AsyncStorage.setItem('profilePhoto', profilePhoto);
      await AsyncStorage.setItem('token', token);

      navigation.navigate('Home');
    } catch (error) {
      if (error.response) {
        console.log('Response Error:', error.response.data);
        console.log('Response Status:', error.response.status);
        Alert.alert('O Login falhou', 'Senha ou usuário inválido(s)');
      } else if (error.request) {
        console.log('Request Error:', error.request);
        Alert.alert('O Login falhou', 'Sem resposta do servidor');
      } else {
        console.log('Error:', error.message);
        Alert.alert('O Login falhou', 'Um erro inesperado aconteceu');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
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
        disabled={isLoading}
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
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 32,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: 'white',
    width: 300,
    marginTop: 5,
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
