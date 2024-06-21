import React, { createContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [firstName, setFirstName] = useState('');
  const [percentages, setPercentages] = useState({ mente: 0, lifestyle: 0, corpo: 0 });
  const [loading, setLoading] = useState(true);
  const [userLogged, setUserLogged] = useState(null); // Track userLogged
  const [token, setToken] = useState(null); // Track token

  // Function to handle login
  const handleLogin = async (email, password) => {
    setLoading(true);
    try {
      const response = await axios.post('https://api3.gps.med.br/API/Acesso/login', {
        Usuario: email,
        Senha: password
      });

      const { token } = response.data;
      setToken(token); // Set token to state
      await AsyncStorage.setItem('token', token);

      const userDataResponse = await axios.get('https://api3.gps.med.br/API/Acesso/obter-dados-usuario', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const { userLogged, userLoggedName } = userDataResponse.data;
      setUserLogged(userLogged); // Set userLogged to state
      await AsyncStorage.setItem('userLogged', userLogged);
      await AsyncStorage.setItem('userLoggedName', userLoggedName);

      const firstName = userLoggedName.split(' ')[0].toUpperCase();
      setFirstName(firstName);
    } catch (error) {
      console.error('Login error:', error);
      throw error; // Propagate error to handle in LoginScreen
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch percentages
  const fetchPercentages = async () => {
    if (!token || !userLogged) {
      console.error('Token or userLogged not found');
      return; // Exit early if token or userLogged not available
    }

    try {
      const indicatorIds = {
        mente: '40c6eaad-8815-4cbc-9caf-78f081f03674',
        lifestyle: '7ed63315-ff7b-4658-b488-7655487e2845',
        corpo: '20118275-8791-469e-b9f5-3210f990dd01'
      };

      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      const responses = await Promise.all(Object.values(indicatorIds).map(indicatorId =>
        axios.get(`https://api3.gps.med.br/API/DadosIndicadores/tipo-indicadores-porcetagem-preenchimento/${userLogged}/${indicatorId}`, config)
      ));

      const preenchidos = responses.map(response => response.data.preenchidos);
      const total = 6;
      const calculatedPercentages = {
        mente: Math.round((preenchidos[0] / total) * 100),
        lifestyle: Math.round((preenchidos[1] / total) * 100),
        corpo: Math.round((preenchidos[2] / total) * 100),
      };

      setPercentages(calculatedPercentages);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DataContext.Provider value={{ firstName, percentages, loading, handleLogin, fetchPercentages }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;