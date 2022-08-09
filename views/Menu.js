import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, TextInput, Alert } from 'react-native-web';
import axios from 'axios';
import authContext from '../contexts/authContext.js';

fetchData(text) {
    this.setState({ text });
    const apikey = '&apiKey=f6f6f4ca17c74fdb8051f432f9e7cc00';
    const url = 'https://api.spoonacular.com/recipes/complexSearch?query';

    return axios.get(url + text)
        .then(response => response.json())
        .then((responseJson) => {
        this.setState({
            dataSource: responseJson.Search,
        });
        })
        .catch((error) => {
        console.log(error);
        });
  }

export default function login() {
  const [email, onChangeEmail] = useState('');
  const [passwd, onChangePasswd] = useState('');
  const { setToken } = useContext(authContext);

  return (
    <View style={styles.container}>
      
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