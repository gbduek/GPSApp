import axios from 'axios';

// Fetches the Dimensions that are available to the user
export const fetchMenuData = async (userLogged, token) => {
  const response = await axios.get(`https://api3.gps.med.br/API/Menu/menu-cliente/${userLogged}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};