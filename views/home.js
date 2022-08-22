import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, TextInput, Alert, FlatList } from 'react-native-web';
import Busqueda from './busqueda.js'
import axios from 'axios';
import Plato from './plato';

export default function platos({props}) {
  const renderItem = ({ item }) => (
    <Plato data={item} added={true} menu={props.menu} setMenu={props.setMenu} />
  )

  return (
    <View style={styles.container}>
      <FlatList
        data={props.menu}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.platos}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: '0',
    marginLeft: '1rem'
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