import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Text } from 'react-native';
import {AuthState} from "../Context/AuthProvider";

const Login = ({ navigation }) => {

  const { loginUser, setLoggedIn } = AuthState();
  const [apiKey, setApiKey] = useState('');
  const [token, setToken] = useState('');

  const handleLogin = () => {
    loginUser(apiKey, token);
    setLoggedIn(true);
    navigation.navigate('Espace de travail');
  };


  return (
    <View style={styles.container}>
      <Text>API Key:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setApiKey}
        value={apiKey}
        placeholder="Entrer la clé d'API"
      />

      <Text>Token:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setToken}
        value={token}
        placeholder="Entrer le token"
        secureTextEntry
      />

      <Button title="Connexion" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
});

export default Login;