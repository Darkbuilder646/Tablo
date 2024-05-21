import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './screens/Login';
import Workspaces from './screens/Workspaces';
import Boards from './screens/Boards';
import Lists from './screens/Lists';

import AuthProvider from './Context/AuthProvider';
import ApiProvider from './Context/ApiProvider';


const Stack = createStackNavigator();

const App = () => {
  return (
    <AuthProvider>
      <ApiProvider>
        <NativeBaseProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
              <Stack.Screen name="Connexion" component={Login} />
              <Stack.Screen name="Espace de travail" component={Workspaces} />
              <Stack.Screen name="Tableaux" component={Boards} />
              <Stack.Screen name="Listes" component={Lists} /> 
            </Stack.Navigator>
          </NavigationContainer>
        </NativeBaseProvider>
      </ApiProvider>
    </AuthProvider>
  );
};



export default App;
