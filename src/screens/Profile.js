import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import DataContext from '../../Context/DataContext';
import Header from '../../Components/Header';

const Profile = () => {
  const { token, userLogged } = useContext(DataContext);
  const [profileData, setProfileData] = useState({});
  const [selectedSex, setSelectedSex] = useState('');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`https://api3.gps.med.br/API/GPS_PessoaFisica(Id=${userLogged})`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = JSON.parse(response.data.value);
        setProfileData(data);
        setSelectedSex(data.Sexo === 'M' ? 'masculino' : 'feminino');
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, [userLogged]);

  const handleForgotPassword = async (email) => {
    if (email !== '') {
      try {
        const url = `https://api3.gps.med.br/API/Acesso/EsqueciSenha`;
        const postData = {
          Usuario: email
        };

        const response = await axios.post(url, postData);
        const { message, status } = response.data;

        if (status === 200) {
          Alert.alert('Sucesso', 'Um email foi enviado para resetar sua senha.');
        } else {
          Alert.alert('Erro', message || 'Ocorreu um erro ao tentar resetar a senha.');
        }
        
      } catch (error) {
        console.error('API Error:', error);
        Alert.alert('Erro', 'Ocorreu um erro ao tentar resetar a senha.');
      }

      Alert.alert('Erro', 'Por favor, insira um email válido.');
    }
  };

  const data = [
    { title: 'Nome e Sobrenome*', placeholder: 'Digite seu nome completo', type: 'text', value: profileData.Nome },
    { title: 'CPF*', placeholder: 'Digite seu CPF', type: 'text', value: profileData.CPF },
    { title: 'E-mail*', placeholder: 'Digite seu e-mail', type: 'text', value: profileData.Email },
    { title: 'Data de Nascimento*', placeholder: 'Digite sua data de nascimento', type: 'text', value: new Date(profileData.DataNascimento).toLocaleDateString() },
    { title: 'Sexo*', placeholder: '', type: 'selector', value: profileData.Sexo },
    { title: 'Data de Cadastro*', placeholder: 'Digite a data de cadastro', type: 'text', value: new Date(profileData.DataCadastro).toLocaleDateString() },
    { title: 'Telefone Celular', placeholder: 'Digite seu telefone celular', type: 'text', value: profileData.TelefoneCelular },
  ];

  const renderItem = ({ item }) => {
    if (item.type === 'selector') {
      return (
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>{item.title}</Text>
          <TouchableOpacity
            style={styles.selector}
            onPress={() => setIsDropdownVisible(!isDropdownVisible)}
          >
            <Text style={styles.selectorText}>
              {selectedSex ? selectedSex.charAt(0).toUpperCase() + selectedSex.slice(1) : 'Selecione o sexo'}
            </Text>
            <Ionicons name={isDropdownVisible ? 'arrow-up' : 'arrow-down'} size={24} color="orange" />
          </TouchableOpacity>
          {isDropdownVisible && (
            <View style={styles.dropdown}>
              <TouchableOpacity
                style={styles.dropdownOption}
                onPress={() => { setSelectedSex('masculino'); setIsDropdownVisible(false); }}
              >
                <Text style={styles.dropdownText}>Masculino</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.dropdownOption}
                onPress={() => { setSelectedSex('feminino'); setIsDropdownVisible(false); }}
              >
                <Text style={styles.dropdownText}>Feminino</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      );
    }
    return (
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>{item.title}</Text>
        <TextInput
          style={styles.input}
          placeholder={item.placeholder}
          placeholderTextColor="#999"
          value={item.value}
        />
      </View>
    );
  };


  const randomImageURL = `https://api3.gps.med.br/API/upload/image?vinculo=${userLogged}&tipo=pessoa`;

  return (
    <View style={{backgroundColor: 'white'}}>
      <Header/>
      <FlatList
        data={data}
        ListHeaderComponent={() => (
          <View style={styles.container}>
            <View style={styles.profileContainer}>
              <Image
                style={styles.profileImage}
                source={{ uri: randomImageURL }}
              />
            </View>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item) => item.title}
              style={styles.inputList}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => handleForgotPassword(profileData.Email)} style={styles.button}>
                <Text style={styles.buttonText}>Alterar senha</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, { backgroundColor: '#FFA500' }]}>
                <Text style={[styles.buttonText, { color: '#FFF' }]}>Salvar</Text>
              </TouchableOpacity>
            </View>
            <View style={{height: 150}}/>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#FFA500',
  },
  inputContainer: {
    marginBottom: 25,
  },
  inputTitle: {
    fontWeight: 'bold',
    color: '#FFA500',
    marginBottom: 10,
    fontSize: 18,
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 5,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 18,
  },
  selector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 5,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  selectorText: {
    fontSize: 18,
    color: '#000',
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 5,
    marginTop: 5,
  },
  dropdownOption: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  dropdownText: {
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  button: {
    width: '48%',
    borderRadius: 30,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderColor: '#FFA500',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFA500',
  },
});

export default Profile;
