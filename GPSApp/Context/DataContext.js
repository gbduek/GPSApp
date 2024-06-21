import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [firstName, setFirstName] = useState('');
  const [percentages, setPercentages] = useState({ mente: 0, lifestyle: 0, corpo: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const name = await AsyncStorage.getItem('userLoggedName');
        if (name) {
          const firstName = name.split(' ')[0].toUpperCase();
          setFirstName(firstName);
        }
      } catch (error) {
        console.log('Failed to fetch user name from AsyncStorage:', error);
      }
    };

    fetchUserName();
  }, []);

  useEffect(() => {
    const fetchPercentages = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        const storedUserLogged = await AsyncStorage.getItem('userLogged');
        if (!storedToken || !storedUserLogged) {
          throw new Error('Token or userLogged not found');
        }

        const indicatorIds = {
          mente: '40c6eaad-8815-4cbc-9caf-78f081f03674',
          lifestyle: '7ed63315-ff7b-4658-b488-7655487e2845',
          corpo: '20118275-8791-469e-b9f5-3210f990dd01'
        };

        const config = {
          headers: {
            Authorization: `Bearer ${storedToken}`
          }
        };

        const responses = await Promise.all(Object.values(indicatorIds).map(indicatorId =>
          axios.get(`https://api3.gps.med.br/API/DadosIndicadores/tipo-indicadores-porcetagem-preenchimento/${storedUserLogged}/${indicatorId}`, config)
        ));

        const preenchidos = responses.map(response => response.data.preenchidos);
        const total = 6;
        const calculatedPercentages = {
          mente: Math.round((preenchidos[0] / total) * 100),
          lifestyle: Math.round((preenchidos[1] / total) * 100),
          corpo: Math.round((preenchidos[2] / total) * 100),
        };

        setPercentages(calculatedPercentages);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchPercentages();
  }, []);

  return (
    <DataContext.Provider value={{ firstName, percentages, loading }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
