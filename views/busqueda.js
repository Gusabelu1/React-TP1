import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, TextInput, Alert, Modal, FlatList } from 'react-native-web';
import axios from 'axios';
import Plato from './plato'

async function onChangeFetchData(text) {
  const apikey = 'efa1021bcb2349a0b2f5517ef40ba1bf';
  const url = 'https://api.spoonacular.com/recipes/complexSearch';
  if (text.length > 2) {
    return await axios.get(url, {
      params: {
        apiKey: apikey,
        query: text
      }
    })
    .then((response) => {
      return response.data.results;
    })
    .catch(() => {
      return null;
    });
  }
}

export default function platos({props}) {
  const [platos, setPlatos] = useState([]);
  const renderItem = ({ item }) => (
    <Plato data={item} added={false} menu={props.menu} setMenu={props.setMenu} />
  )

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.search}
        onChangeText={async (text) => {setPlatos(await onChangeFetchData(text))}}
        placeholder="Escriba algún plato"
      />
      <FlatList
        data={platos}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.platos}
      />
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
      paddingTop: '1rem',
      // minHeight: '175%',
    }
  });