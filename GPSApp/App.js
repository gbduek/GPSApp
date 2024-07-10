import React, { useState } from 'react';
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native';
import { DataProvider } from './Context/DataContext.js';
import LoginScreen from './src/screens/LoginScreen.js';
import DrawerRoutes from './src/routes/drawer.routes.js';




const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <DataProvider>
      <NavigationContainer>
        {isAuthenticated ? (
          <DrawerRoutes/>
        ) : (
          <LoginScreen onLoginSuccess={handleLoginSuccess} />
        )}
      </NavigationContainer>
    </DataProvider>
  );
};

export default App;
