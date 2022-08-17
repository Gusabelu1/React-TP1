import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, TextInput, Alert, FlatList } from 'react-native-web';
import Busqueda from './busqueda.js'
import axios from 'axios';

async function fetchData(text) {
  const apikey = '&apiKey=f6f6f4ca17c74fdb8051f432f9e7cc00';
  const url = 'https://api.spoonacular.com/recipes/complexSearch?query=';

  return await axios.get(url + text + apikey)
    .then((response) => {
      return response.data.results;
    })
    .catch(() => {
      return null;
    });
}

export default function platos({props}) {
  const [busqueda, setBusqueda] = useState('');
  const [platos, setPlatos] = useState([]);

  return (
    <View style={styles.container}>
      {Object.values(props.menu).map(item => {
        return ([
          <Text style={styles.platos} key={item.id}>sexo</Text>,
          <Image
            style={styles.stretch}
            source={item.image}
          />
        ]);
      })}
      <FlatList>

      </FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1d1d27',
    alignItems: 'center',
    justifyContent: '',
  },

  search: {
    color: '#fff',
    borderBottomWidth: '.1rem',
    borderBottomColor: '#fff',
    paddingVertical: '.5rem',
    paddingHorizontal: '5rem',
  },

  platos: {
    color: '#fff',
  }
});