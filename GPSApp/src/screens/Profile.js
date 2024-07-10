import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Menu from '../../Components/Menu';
import Header from '../../Components/Header';

const Profile = () => {
  const [selectedSex, setSelectedSex] = useState('');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const data = [
    { title: 'Nome e Sobrenome*', placeholder: 'Digite seu nome completo', type: 'text' },
    { title: 'CPF*', placeholder: 'Digite seu CPF', type: 'text' },
    { title: 'E-mail*', placeholder: 'Digite seu e-mail', type: 'text' },
    { title: 'Data de Nascimento*', placeholder: 'Digite sua data de nascimento', type: 'text' },
    { title: 'Sexo*', placeholder: '', type: 'selector' },  // Indicate this is a selector type
    { title: 'Situação*', placeholder: 'Digite sua situação', type: 'text' },
    { title: 'Data de Cadastro*', placeholder: 'Digite a data de cadastro', type: 'text' },
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
        />
      </View>
    );
  };

  // Generate a random image URL for the dummy profile picture
  const randomImageURL = `https://api3.gps.med.br/API/upload/image?vinculo=e91f978d-da58-e792-92cb-c0b993b24afd&tipo=pessoa`;

  return (
    <View style={{backgroundColor: 'white'}}>
      <Header/>
      <Menu />
      <FlatList
        data={data}
        ListHeaderComponent={() => (
          <View style={styles.container}>
            <View style={styles.profileContainer}>
              {/* Use the random image URL as the dummy profile picture */}
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
              <TouchableOpacity style={styles.button}>
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
    width: 120,  // Increased size
    height: 120,  // Increased size
    borderRadius: 60,  // Adjusted to match new size
    borderWidth: 3,  // Increased border width
    borderColor: '#FFA500',
  },
  inputContainer: {
    marginBottom: 25,  // Increased margin
  },
  inputTitle: {
    fontWeight: 'bold',
    color: '#FFA500',
    marginBottom: 10,  // Increased margin
    fontSize: 18,  // Increased font size
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 5,
    paddingHorizontal: 12,  // Increased padding
    paddingVertical: 10,  // Increased padding
    fontSize: 18,  // Increased font size
  },
  selector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 5,
    paddingHorizontal: 12,  // Increased padding
    paddingVertical: 10,  // Increased padding
  },
  selectorText: {
    fontSize: 18,  // Increased font size
    color: '#000',
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 5,
    marginTop: 5,
  },
  dropdownOption: {
    padding: 12,  // Increased padding
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  dropdownText: {
    fontSize: 18,  // Increased font size
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,  // Increased margin
  },
  button: {
    width: '48%',
    borderRadius: 30,  // Increased border radius
    paddingVertical: 12,  // Increased padding
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderColor: '#FFA500',
  },
  buttonText: {
    fontSize: 18,  // Increased font size
    fontWeight: 'bold',
    color: '#FFA500',
  },
});

export default Profile;
