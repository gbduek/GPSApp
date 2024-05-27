import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const textEntrar = 'Entrar';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const navigation = useNavigation();

  const handleLogin = async () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Image
          source={require('./assets/gps_logo.png')}
          style={{width: 300, height: 120, resizeMode: 'stretch', marginBottom: 40}}
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
  inputFocused: {
    backgroundColor: 'white',
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
  text: {
    fontSize: 18,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#ffa500',
  },
});

export default LoginScreen;
