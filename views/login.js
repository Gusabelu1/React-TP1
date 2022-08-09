import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, TextInput, Alert } from 'react-native-web';
import axios from 'axios';
import authContext from '../contexts/authContext.js';

async function authenticate (email, password) {
    return axios.post('http://challenge-react.alkemy.org/', {
        email: email,
        password: password
    })
    .then(() => {
        return true;
    })
    .catch(() => {
        return false;
    })
}

export default function login() {
  const [email, onChangeEmail] = useState('');
  const [passwd, onChangePasswd] = useState('');
  const { setToken } = useContext(authContext);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text>Ingresar Email</Text>
        <TextInput
            style={styles.input}
            onChangeText={onChangeEmail}
            value={email}
            placeholder="E-mail"
        />
        <Text>Ingresar Contraseña</Text>
        <TextInput
            style={styles.input}
            onChangeText={onChangePasswd}
            value={passwd}
            placeholder="Contraseña"
            secureTextEntry={true}
        />
        <Button
            title="Enviar"
            onPress={async () => {
                if (!email || !passwd) {
                    console.log('error');
                } else {
                    const response = await authenticate(email, passwd);
                    setToken(response)
                }
            }}
        ></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1d1d27',
      alignItems: 'center',
      justifyContent: 'center',
    },

    card: {
        backgroundColor: '#fff',
        padding: '2rem',
        borderRadius: '10px',
    }
  });