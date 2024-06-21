import React, { useState, useContext } from 'react';
import { View, TextInput, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DataContext from './Context/DataContext';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const { handleLogin } = useContext(DataContext);

  const onLoginPress = async () => {
    setIsLoading(true);
    try {
      await handleLogin(email, password);
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('O Login falhou', 'Senha ou usuário inválido(s)');
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
        onPress={onLoginPress}
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
