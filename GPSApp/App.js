import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './LoginScreen';
import Home from './HomeScreen';
import Mente from './Mente';
import LifeStyle from './LifeStyle.js';
import RegistryMind from './Registries/RegistryMind.js';
import Questionary from './Components/Questionary.js';
import Diary from './Diary.js';
import Profile from './Profile.js';
import Corpo from './Corpo.js';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Mente" component={Mente} />
        <Stack.Screen name="Corpo" component={Corpo} />
        <Stack.Screen name="LifeStyle" component={LifeStyle} />
        <Stack.Screen name="RegistryMind" component={RegistryMind} />
        <Stack.Screen name="Questionary" component={Questionary} />
        <Stack.Screen name="Diary" component={Diary} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
