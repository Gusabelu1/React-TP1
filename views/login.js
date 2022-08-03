import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, TextInput, Alert } from 'react-native-web';
import axios from 'axios';

function authenticate (email, password) {
    axios.post('http://challenge-react.alkemy.org/', {
        email: email,
        password: password
    })
    .then(function (response) {
        gettingData = false;
        console.log(response);
    })
    .catch(function (error) {
        gettingData = false;
        console.log(error);
    })
}

export default function login() {
  const [email, onChangeEmail] = useState('');
  const [passwd, onChangePasswd] = useState('');

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
            onPress={() => {
                if (!email || !passwd) {
                    console.log('error');
                } else {
                    setTimeout(() => {  authenticate(email, passwd); }, 5000);
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